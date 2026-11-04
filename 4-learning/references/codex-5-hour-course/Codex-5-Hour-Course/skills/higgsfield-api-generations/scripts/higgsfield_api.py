#!/usr/bin/env python3
"""Minimal, dependency-free Higgsfield API client for the skill package."""

from __future__ import annotations

import argparse
import json
import math
import mimetypes
import os
import random
import re
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


API_BASE = "https://api.higgsfield.ai"
DEFAULT_VIDEO_MODEL = "bytedance/seedance-2.5/text-to-video"
DEFAULT_IMAGE_VIDEO_MODEL = "bytedance/seedance-2.5/image-to-video"
DEFAULT_REFERENCE_VIDEO_MODEL = "bytedance/seedance-2.5/reference-to-video"
DEFAULT_IMAGE_MODEL = "higgsfield-ai/soul/v2/standard"
TERMINAL = {"completed", "failed", "nsfw", "canceled", "cancelled"}
COMBINED_KEY_NAMES = ("HIGGSFIELD_API_KEY", "HF_KEY", "HF_CREDENTIALS")


class HiggsfieldError(RuntimeError):
    def __init__(self, message: str, status: int | None = None, body: Any = None):
        super().__init__(message)
        self.status = status
        self.body = body


def eprint(*values: Any) -> None:
    print(*values, file=sys.stderr, flush=True)


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat()


def find_env_file(explicit: str | None = None) -> Path:
    if explicit:
        path = Path(explicit).expanduser().resolve()
        if not path.is_file():
            raise HiggsfieldError(f"Environment file not found: {path}")
        return path
    current = Path.cwd().resolve()
    for directory in (current, *current.parents):
        candidate = directory / ".env"
        if candidate.is_file():
            return candidate
    raise HiggsfieldError(
        "No .env file found. Create one with "
        "HIGGSFIELD_API_KEY=YOUR_KEY_ID:YOUR_KEY_SECRET"
    )


def parse_dotenv(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8-sig").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
            value = value[1:-1]
        values[key] = value
    return values


def load_credentials(env_file: Path) -> str:
    file_values = parse_dotenv(env_file)
    for name in COMBINED_KEY_NAMES:
        value = os.environ.get(name) or file_values.get(name)
        if value:
            value = value.strip()
            if ":" not in value:
                raise HiggsfieldError(
                    f"{name} must contain KEY_ID:KEY_SECRET. The value was not printed."
                )
            return value
    key_id = (
        os.environ.get("HF_API_KEY_ID")
        or file_values.get("HF_API_KEY_ID")
        or os.environ.get("HF_API_KEY")
        or file_values.get("HF_API_KEY")
    )
    secret = (
        os.environ.get("HF_API_KEY_SECRET")
        or file_values.get("HF_API_KEY_SECRET")
        or os.environ.get("HF_API_SECRET")
        or file_values.get("HF_API_SECRET")
    )
    if key_id and secret:
        return f"{key_id}:{secret}"
    raise HiggsfieldError(
        "Higgsfield credential missing. Add "
        "HIGGSFIELD_API_KEY=YOUR_KEY_ID:YOUR_KEY_SECRET to .env."
    )


def safe_json_loads(text: str) -> Any:
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {"raw": text[:2000]}


def api_request(
    method: str,
    url: str,
    credential: str,
    payload: dict[str, Any] | None = None,
    timeout: float = 60,
) -> tuple[Any, dict[str, str]]:
    headers = {
        "Authorization": f"Key {credential}",
        "Accept": "application/json",
        "User-Agent": "higgsfield-api-generations-skill/1.0",
    }
    data = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        data = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            text = response.read().decode("utf-8", errors="replace")
            return safe_json_loads(text) if text else {}, dict(response.headers.items())
    except urllib.error.HTTPError as error:
        text = error.read().decode("utf-8", errors="replace")
        body = safe_json_loads(text)
        correlation = error.headers.get("X-Correlation-ID") if error.headers else None
        detail = body.get("detail") if isinstance(body, dict) else None
        if isinstance(detail, (dict, list)):
            detail = json.dumps(detail, ensure_ascii=False)
        message = f"Higgsfield API returned HTTP {error.code}"
        if detail:
            message += f": {detail}"
        if correlation:
            message += f" (correlation ID: {correlation})"
        raise HiggsfieldError(message, status=error.code, body=body) from None
    except urllib.error.URLError as error:
        raise HiggsfieldError(f"Network error contacting Higgsfield: {error.reason}") from None


def model_catalog(credential: str) -> dict[str, Any]:
    result, _ = api_request("GET", f"{API_BASE}/models", credential, timeout=30)
    if not isinstance(result, dict) or "items" not in result:
        raise HiggsfieldError("Unexpected model catalog response")
    return result


def load_extra_params(args: argparse.Namespace) -> dict[str, Any]:
    params: dict[str, Any] = {}
    if args.params_file:
        path = Path(args.params_file).expanduser().resolve()
        loaded = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(loaded, dict):
            raise HiggsfieldError("--params-file must contain one JSON object")
        params.update(loaded)
    if args.params_json:
        loaded = json.loads(args.params_json)
        if not isinstance(loaded, dict):
            raise HiggsfieldError("--params-json must be one JSON object")
        params.update(loaded)
    return params


def choose_model(args: argparse.Namespace) -> str:
    if args.model:
        return args.model.strip("/")
    if args.kind == "image":
        return DEFAULT_IMAGE_MODEL
    if args.video_url or args.audio_url:
        return DEFAULT_REFERENCE_VIDEO_MODEL
    if args.image_url or args.image_file:
        return DEFAULT_IMAGE_VIDEO_MODEL
    return DEFAULT_VIDEO_MODEL


def build_payload(args: argparse.Namespace, model: str) -> dict[str, Any]:
    payload: dict[str, Any] = {"prompt": args.prompt}
    if args.kind == "video":
        payload.update(
            {
                "duration": args.duration,
                "resolution": args.resolution,
                "aspect_ratio": args.aspect_ratio,
                "output_format": args.output_format,
                "generate_audio": args.audio,
            }
        )
    if args.image_url:
        payload["image_url"] = args.image_url
    if args.end_image_url:
        payload["end_image_url"] = args.end_image_url
    if args.video_url:
        payload["video_urls"] = args.video_url
    if args.audio_url:
        payload["audio_urls"] = args.audio_url
    payload.update(load_extra_params(args))

    if model == DEFAULT_IMAGE_VIDEO_MODEL:
        # The input image determines the frame shape. The documented endpoint
        # does not list aspect_ratio even though the estimate route may accept it.
        payload.pop("aspect_ratio", None)

    # Soul Standard's documented quickstart requires only the prompt. Do not
    # transfer video defaults into image model payloads.
    if args.kind == "image" and model == DEFAULT_IMAGE_MODEL:
        payload = {"prompt": args.prompt, **load_extra_params(args)}
    return {key: value for key, value in payload.items() if value is not None}


def estimate_cost(credential: str, model: str, payload: dict[str, Any]) -> dict[str, Any]:
    result, headers = api_request(
        "POST", f"{API_BASE}/estimate/{model}", credential, payload, timeout=60
    )
    if not isinstance(result, dict):
        raise HiggsfieldError("Unexpected estimate response")
    correlation = headers.get("X-Correlation-ID") or headers.get("x-correlation-id")
    if correlation:
        result = {**result, "correlation_id": correlation}
    return result


def numeric_cost(estimate: dict[str, Any]) -> tuple[str | None, str | None]:
    usd = estimate.get("usd")
    credits = estimate.get("credits")
    return (str(usd) if usd is not None else None, str(credits) if credits is not None else None)


def seedance_list_cost(model: str, payload: dict[str, Any], estimate: dict[str, Any]) -> dict[str, Any] | None:
    if not model.startswith("bytedance/seedance-2.5/"):
        return None
    description = str(estimate.get("pricing_description") or "")
    rate_match = re.search(
        r"each 1,000 video tokens cost \$([0-9]+(?:\.[0-9]+)?)", description
    )
    if not rate_match:
        return None
    resolution = str(payload.get("resolution", "720p")).lower()
    dimensions = {"480p": (854, 480), "720p": (1280, 720)}.get(resolution)
    if not dimensions:
        return None
    generated_seconds = float(payload.get("duration", 5))
    input_seconds = float(payload.get("input_video_seconds", 0) or 0)
    video_urls = payload.get("video_urls") or []
    if video_urls and not input_seconds:
        measured: list[float] = []
        for url in video_urls:
            duration = probe_remote_video_duration(str(url))
            if duration is None:
                return {
                    "list_usd_before_discounts": None,
                    "warning": "Video-reference duration could not be measured, so no cost number was invented.",
                }
            measured.append(duration)
        input_seconds = sum(measured)
    width, height = dimensions
    tokens = math.ceil((input_seconds + generated_seconds) * width * height * 24 / 1024)
    rate = float(rate_match.group(1))
    if video_urls:
        reference_rate = re.search(
            r"or \$([0-9]+(?:\.[0-9]+)?) with video input", description
        )
        if not reference_rate:
            return {
                "list_usd_before_discounts": None,
                "warning": "The pricing response did not expose a parsable video-reference token rate.",
            }
        rate = float(reference_rate.group(1))
    list_usd = tokens / 1000 * rate
    return {
        "video_tokens": tokens,
        "input_video_seconds": round(input_seconds, 6),
        "generated_video_seconds": generated_seconds,
        "list_usd_before_discounts": f"{list_usd:.4f}",
        "rate_per_1000_tokens": f"{rate:.8f}".rstrip("0").rstrip("."),
        "warning": "The estimate response did not expose the account's net discounted charge.",
    }


def make_run_dir(env_file: Path, kind: str, explicit: str | None = None) -> Path:
    if explicit:
        root = Path(explicit).expanduser().resolve()
    else:
        root = env_file.parent / "projects" / "higgsfield-api-generations" / "outputs"
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    run_dir = root / f"{stamp}-{kind}"
    run_dir.mkdir(parents=True, exist_ok=False)
    return run_dir


def write_json(path: Path, value: Any) -> None:
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def upload_file(credential: str, source: Path) -> dict[str, Any]:
    source = source.expanduser().resolve()
    if not source.is_file():
        raise HiggsfieldError(f"Upload source not found: {source}")
    content_type, _ = mimetypes.guess_type(source.name)
    aliases = {"image/jpg": "image/jpeg", "audio/x-wav": "audio/wav"}
    content_type = aliases.get(content_type or "", content_type or "")
    allowed = {
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "audio/wav",
        "video/mp4",
    }
    if content_type not in allowed:
        raise HiggsfieldError(
            f"Unsupported upload type for {source.name}: {content_type or 'unknown'}"
        )
    upload, _ = api_request(
        "POST",
        f"{API_BASE}/files/generate-upload-url",
        credential,
        {"content_type": content_type},
        timeout=30,
    )
    if not isinstance(upload, dict) or not upload.get("upload_url") or not upload.get("public_url"):
        raise HiggsfieldError("Unexpected presigned upload response")
    headers = {str(k): str(v) for k, v in (upload.get("upload_headers") or {}).items()}
    request = urllib.request.Request(
        str(upload["upload_url"]),
        data=source.read_bytes(),
        headers=headers,
        method="PUT",
    )
    try:
        with urllib.request.urlopen(request, timeout=300) as response:
            response.read()
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        raise HiggsfieldError(
            f"Presigned media upload failed with HTTP {error.code}: {body[:500]}"
        ) from None
    return {
        "source": str(source),
        "public_url": str(upload["public_url"]),
        "content_type": content_type,
    }


def upload_local_inputs(args: argparse.Namespace, credential: str) -> list[dict[str, Any]]:
    uploaded: list[dict[str, Any]] = []
    for file_attr, url_attr in (
        ("image_file", "image_url"),
        ("end_image_file", "end_image_url"),
    ):
        value = getattr(args, file_attr, None)
        if not value:
            continue
        if getattr(args, url_attr, None):
            raise HiggsfieldError(f"Use either --{file_attr.replace('_', '-')} or --{url_attr.replace('_', '-')}, not both")
        item = upload_file(credential, Path(value))
        setattr(args, url_attr, item["public_url"])
        uploaded.append(item)
    return uploaded


def poll_status(
    credential: str,
    status_url: str,
    timeout_seconds: int,
    run_file: Path | None = None,
    run_state: dict[str, Any] | None = None,
) -> dict[str, Any]:
    deadline = time.monotonic() + timeout_seconds
    delay = 2.0
    last_status = None
    transient_failures = 0
    while True:
        if time.monotonic() >= deadline:
            raise HiggsfieldError(
                f"Timed out waiting for generation. Resume later using {run_file or status_url}."
            )
        try:
            result, _ = api_request("GET", status_url, credential, timeout=30)
            transient_failures = 0
        except HiggsfieldError as error:
            if error.status is not None and error.status < 500:
                raise
            transient_failures += 1
            if transient_failures > 6:
                raise
            eprint(f"Transient status error. Retrying in {delay:.1f}s.")
            time.sleep(delay + random.uniform(0, 0.5))
            delay = min(delay * 1.5, 10.0)
            continue
        status = str(result.get("status", "unknown"))
        if status != last_status:
            eprint(f"Higgsfield status: {status}")
            last_status = status
        if run_file and run_state is not None:
            run_state.update({"status": status, "last_status_response": result, "updated_at": utc_now()})
            write_json(run_file, run_state)
        if status in TERMINAL:
            return result
        time.sleep(delay + random.uniform(0, 0.5))
        delay = min(delay * 1.5, 10.0)


def output_urls(result: dict[str, Any]) -> list[tuple[str, str]]:
    found: list[tuple[str, str]] = []
    for index, item in enumerate(result.get("images") or [], start=1):
        if isinstance(item, dict) and item.get("url"):
            found.append((f"image-{index}", str(item["url"])))
    for field in ("video", "audio", "zip", "mov", "jsx", "fbx", "ply"):
        item = result.get(field)
        if isinstance(item, dict) and item.get("url"):
            found.append((field, str(item["url"])))
        elif isinstance(item, str) and item.startswith("http"):
            found.append((field, item))
    for index, item in enumerate(result.get("audios") or [], start=1):
        if isinstance(item, dict) and item.get("url"):
            found.append((f"audio-{index}", str(item["url"])))
    return found


def extension_for(url: str, label: str) -> str:
    suffix = Path(urllib.parse.urlparse(url).path).suffix
    if suffix and len(suffix) <= 8:
        return suffix
    return {"video": ".mp4", "audio": ".mp3", "mov": ".mov", "zip": ".zip"}.get(label, ".bin")


def download_outputs(result: dict[str, Any], run_dir: Path) -> list[str]:
    paths: list[str] = []
    for label, url in output_urls(result):
        destination = run_dir / f"{label}{extension_for(url, label)}"
        request = urllib.request.Request(url, headers={"User-Agent": "higgsfield-api-generations-skill/1.0"})
        with urllib.request.urlopen(request, timeout=180) as response, destination.open("wb") as output:
            shutil.copyfileobj(response, output)
        paths.append(str(destination.resolve()))
    return paths


def probe_video(path: Path) -> dict[str, Any] | None:
    executable = shutil.which("ffprobe")
    if not executable:
        return None
    command = [
        executable,
        "-v",
        "error",
        "-show_entries",
        "format=duration,size,bit_rate:stream=index,codec_name,codec_type,width,height,r_frame_rate,pix_fmt",
        "-of",
        "json",
        str(path),
    ]
    completed = subprocess.run(command, capture_output=True, text=True, timeout=30, check=False)
    if completed.returncode != 0:
        return {"error": completed.stderr.strip()[:500]}
    return json.loads(completed.stdout)


def probe_remote_video_duration(url: str) -> float | None:
    executable = shutil.which("ffprobe")
    if not executable:
        return None
    command = [
        executable,
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        url,
    ]
    completed = subprocess.run(command, capture_output=True, text=True, timeout=60, check=False)
    if completed.returncode != 0:
        return None
    try:
        return float(completed.stdout.strip())
    except ValueError:
        return None


def build_cost_report(status: str, estimate: dict[str, Any], computed: dict[str, Any] | None) -> dict[str, Any]:
    usd, credits = numeric_cost(estimate)
    normalized = "canceled" if status == "cancelled" else status
    if normalized in {"failed", "nsfw", "canceled"}:
        return {
            "charged_usd": "0",
            "charged_credits": "0",
            "basis": "Higgsfield does not charge failed or NSFW requests and refunds successful queued cancellations.",
            "preflight_estimate": estimate,
        }
    if usd is not None:
        return {
            "charged_usd": usd if normalized == "completed" else None,
            "estimated_usd": usd,
            "estimated_credits": credits,
            "basis": "Authenticated estimate for the identical payload; charged when the request completes successfully.",
        }
    return {
        "charged_usd": None,
        "exact_net_charge_available": False,
        "published_calculation": computed,
        "basis": "Higgsfield returned pricing text instead of numeric usd. Do not call the pre-discount calculation an exact net charge.",
        "pricing_description": estimate.get("pricing_description"),
    }


def command_models(args: argparse.Namespace, credential: str) -> int:
    catalog = model_catalog(credential)
    items = catalog.get("items", [])
    if args.output:
        items = [item for item in items if item.get("output_type") == args.output]
    if args.operation:
        items = [item for item in items if args.operation in (item.get("operation_type") or [])]
    items.sort(key=lambda item: (str(item.get("output_type")), str(item.get("title")), str(item.get("slug"))))
    response = {"total": len(items), "items": items}
    if args.json:
        print(json.dumps(response, indent=2, ensure_ascii=False))
    else:
        print(f"{len(items)} Higgsfield API endpoints")
        current = None
        for item in items:
            output = item.get("output_type", "other")
            if output != current:
                current = output
                print(f"\n[{output}]")
            operations = ",".join(item.get("operation_type") or [])
            print(f"- {item.get('title')}: {item.get('slug')} ({operations})")
    return 0


def command_generate(args: argparse.Namespace, credential: str, env_file: Path) -> int:
    uploaded_inputs = upload_local_inputs(args, credential)
    model = choose_model(args)
    payload = build_payload(args, model)
    catalog = model_catalog(credential)
    slugs = {str(item.get("slug")) for item in catalog.get("items", [])}
    if model not in slugs:
        raise HiggsfieldError(
            f"Model is not present in the authenticated live catalog: {model}. "
            "Run the models command and choose a current slug."
        )
    estimate = estimate_cost(credential, model, payload)
    computed = seedance_list_cost(model, payload, estimate)
    preflight = {
        "model": model,
        "payload": payload,
        "estimate": estimate,
        "published_calculation": computed,
        "uploaded_inputs": uploaded_inputs,
        "will_submit": bool(args.yes),
    }
    if not args.yes:
        print(json.dumps(preflight, indent=2, ensure_ascii=False))
        eprint("Cost preflight complete. No generation was submitted. Add --yes only after authorization.")
        return 0

    run_dir = make_run_dir(env_file, args.kind, args.output_dir)
    run_file = run_dir / "run.json"
    try:
        response, headers = api_request(
            "POST", f"{API_BASE}/{model}", credential, payload, timeout=90
        )
    except HiggsfieldError as error:
        write_json(
            run_file,
            {
                "status": "submission_uncertain" if error.status is None else "submission_failed",
                "model": model,
                "payload": payload,
                "estimate": estimate,
                "published_calculation": computed,
                "uploaded_inputs": uploaded_inputs,
                "error": str(error),
                "created_at": utc_now(),
                "warning": "Do not automatically resubmit after an ambiguous network timeout.",
            },
        )
        raise
    request_id = response.get("request_id")
    status_url = response.get("status_url")
    if not request_id or not status_url:
        raise HiggsfieldError(f"Submission response lacked request_id or status_url: {response}")
    correlation = headers.get("X-Correlation-ID") or headers.get("x-correlation-id")
    state: dict[str, Any] = {
        "status": response.get("status", "queued"),
        "request_id": request_id,
        "status_url": status_url,
        "cancel_url": response.get("cancel_url"),
        "correlation_id": correlation,
        "model": model,
        "payload": payload,
        "estimate": estimate,
        "published_calculation": computed,
        "uploaded_inputs": uploaded_inputs,
        "created_at": utc_now(),
        "updated_at": utc_now(),
    }
    write_json(run_file, state)
    eprint(f"Submitted request {request_id}. Checkpoint: {run_file}")
    result = poll_status(credential, status_url, args.timeout, run_file, state)
    status = str(result.get("status", "unknown"))
    downloaded: list[str] = []
    probes: dict[str, Any] = {}
    if status == "completed":
        downloaded = download_outputs(result, run_dir)
        for item in downloaded:
            path = Path(item)
            if path.suffix.lower() in {".mp4", ".mov", ".mkv", ".webm"}:
                probe = probe_video(path)
                if probe is not None:
                    probes[item] = probe
    cost_report = build_cost_report(status, estimate, computed)
    final = {
        **state,
        "status": status,
        "result": result,
        "downloaded_files": downloaded,
        "media_probe": probes,
        "cost_report": cost_report,
        "run_file": str(run_file.resolve()),
        "updated_at": utc_now(),
    }
    write_json(run_file, final)
    print(json.dumps(final, indent=2, ensure_ascii=False))
    return 0 if status == "completed" else 2


def command_resume(args: argparse.Namespace, credential: str) -> int:
    run_file = Path(args.run_file).expanduser().resolve()
    state = json.loads(run_file.read_text(encoding="utf-8"))
    status_url = state.get("status_url")
    if not status_url:
        raise HiggsfieldError("run.json has no status_url and cannot be resumed automatically")
    result = poll_status(credential, status_url, args.timeout, run_file, state)
    status = str(result.get("status", "unknown"))
    run_dir = run_file.parent
    downloaded = state.get("downloaded_files") or []
    if status == "completed" and not downloaded:
        downloaded = download_outputs(result, run_dir)
    probes = state.get("media_probe") or {}
    for item in downloaded:
        path = Path(item)
        if path.suffix.lower() in {".mp4", ".mov", ".mkv", ".webm"} and item not in probes:
            probe = probe_video(path)
            if probe is not None:
                probes[item] = probe
    estimate = state.get("estimate") or {}
    computed = state.get("published_calculation")
    final = {
        **state,
        "status": status,
        "result": result,
        "downloaded_files": downloaded,
        "media_probe": probes,
        "cost_report": build_cost_report(status, estimate, computed),
        "updated_at": utc_now(),
    }
    write_json(run_file, final)
    print(json.dumps(final, indent=2, ensure_ascii=False))
    return 0 if status == "completed" else 2


def command_status(args: argparse.Namespace, credential: str) -> int:
    url = args.status_url or f"{API_BASE}/requests/{args.request_id}/status"
    result, _ = api_request("GET", url, credential, timeout=30)
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


def command_upload(args: argparse.Namespace, credential: str) -> int:
    result = upload_file(credential, Path(args.file))
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="List, estimate, generate, poll, and download Higgsfield API media."
    )
    parser.add_argument("--env-file", help="Path to .env. Defaults to nearest .env upward.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    models = subparsers.add_parser("models", help="List the authenticated live model catalog.")
    models.add_argument("--output", choices=("image", "video"))
    models.add_argument("--operation", help="Filter, for example text2video or image2video.")
    models.add_argument("--json", action="store_true")

    generate = subparsers.add_parser("generate", help="Estimate, then optionally submit generation.")
    generate.add_argument("kind", choices=("image", "video"))
    generate.add_argument("--prompt", required=True)
    generate.add_argument("--model")
    generate.add_argument("--duration", type=int, default=5)
    generate.add_argument("--resolution", default="720p")
    generate.add_argument("--aspect-ratio", default="16:9")
    generate.add_argument("--output-format", default="mp4", choices=("mp4", "mov"))
    audio = generate.add_mutually_exclusive_group()
    audio.add_argument("--audio", dest="audio", action="store_true")
    audio.add_argument("--no-audio", dest="audio", action="store_false")
    generate.set_defaults(audio=False)
    generate.add_argument("--image-url")
    generate.add_argument("--image-file")
    generate.add_argument("--end-image-url")
    generate.add_argument("--end-image-file")
    generate.add_argument("--video-url", action="append", help="Repeat for Seedance reference-to-video.")
    generate.add_argument("--audio-url", action="append", help="Repeat for Seedance reference-to-video.")
    generate.add_argument("--params-json", help="JSON object merged into the request payload.")
    generate.add_argument("--params-file", help="Path to a JSON object merged into the payload.")
    generate.add_argument("--output-dir", help="Override the output root directory.")
    generate.add_argument("--timeout", type=int, default=1800)
    generate.add_argument("--yes", action="store_true", help="Authorize one paid submission.")

    resume = subparsers.add_parser("resume", help="Resume polling from a saved run.json.")
    resume.add_argument("run_file")
    resume.add_argument("--timeout", type=int, default=1800)

    status = subparsers.add_parser("status", help="Fetch one request status without polling.")
    identity = status.add_mutually_exclusive_group(required=True)
    identity.add_argument("--request-id")
    identity.add_argument("--status-url")

    upload = subparsers.add_parser("upload", help="Upload local media and return its temporary public URL.")
    upload.add_argument("file")
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    try:
        env_file = find_env_file(args.env_file)
        credential = load_credentials(env_file)
        if args.command == "models":
            return command_models(args, credential)
        if args.command == "generate":
            return command_generate(args, credential, env_file)
        if args.command == "resume":
            return command_resume(args, credential)
        if args.command == "status":
            return command_status(args, credential)
        if args.command == "upload":
            return command_upload(args, credential)
        parser.error("Unknown command")
        return 2
    except HiggsfieldError as error:
        eprint(f"ERROR: {error}")
        return 1
    except (OSError, ValueError, json.JSONDecodeError) as error:
        eprint(f"ERROR: {error}")
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
