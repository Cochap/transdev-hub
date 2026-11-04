"""YouTube lane for the rag-radar routine: this month's RAG videos.

last30days searches YouTube by relevance, which returns old videos (0-1 of 8 in
the 30-day window, measured 2026-10-29). YouTube's own "This month" filter
(sp=EgIIBA%3D%3D) returns only recent uploads, so this script queries it with
yt-dlp and writes a Markdown list of leads, newest-window only, most viewed first.

Usage:
  python youtube-month.py <output.md> [query ...]
"""
import datetime
import json
import subprocess
import sys
import urllib.parse

DEFAULT_QUERIES = [
    "retrieval augmented generation",
    "rag llm",
    "local rag",
    "rag pipeline",
    "graphrag",
    "rag pdf tables",
    "rag evaluation hallucination",
]
PER_QUERY = 15


def search(query):
    url = (
        "https://www.youtube.com/results?search_query="
        + urllib.parse.quote_plus(query)
        + "&sp=EgIIBA%253D%253D"
    )
    out = subprocess.run(
        ["yt-dlp", url, "--playlist-end", str(PER_QUERY), "--skip-download",
         "--no-warnings", "--ignore-errors", "--print",
         "%(.{id,upload_date,view_count,title,channel})j"],
        capture_output=True, text=True, encoding="utf-8", timeout=300,
    )
    for line in out.stdout.splitlines():
        try:
            yield json.loads(line)
        except json.JSONDecodeError:
            continue


def main():
    output = sys.argv[1]
    queries = sys.argv[2:] or DEFAULT_QUERIES
    start = (datetime.date.today() - datetime.timedelta(days=30)).strftime("%Y%m%d")
    videos = {}
    for query in queries:
        for v in search(query):
            if (v.get("upload_date") or "") >= start and v.get("id"):
                videos.setdefault(v["id"], dict(v, query=query))
    ranked = sorted(videos.values(), key=lambda v: v.get("view_count") or 0, reverse=True)
    lines = [
        f"# YouTube lane — {datetime.date.today()} (uploads since {start}, YouTube 'This month' filter)",
        f"Queries: {', '.join(queries)}. {len(ranked)} videos. Leads only: confirm against a primary source.",
        "",
        "| Uploaded | Views | Title | Channel | Query |",
        "|---|---|---|---|---|",
    ]
    for v in ranked:
        d = v["upload_date"]
        title = (v.get("title") or "").replace("|", "/")
        lines.append(
            f"| {d[:4]}-{d[4:6]}-{d[6:]} | {v.get('view_count') or 0} | "
            f"[{title}](https://www.youtube.com/watch?v={v['id']}) | "
            f"{(v.get('channel') or '').replace('|', '/')} | {v['query']} |"
        )
    with open(output, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"{len(ranked)} videos in window -> {output}")


if __name__ == "__main__":
    main()
