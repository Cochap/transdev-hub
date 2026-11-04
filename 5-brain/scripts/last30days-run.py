"""Run the last30days engine on Greg's Transdev PC.

Python 3.13+ rejects the corporate CA ("Basic Constraints of CA cert not marked
critical"), so every HTTPS call from the engine fails. truststore makes Python
verify through the Windows certificate store instead. This wrapper injects it,
then runs the newest installed engine unchanged (plugin auto-updates keep working).

Usage (from any folder):
  uv run --system-certs --with truststore python "C:\\TRANSDEV HUB\\5-brain\\scripts\\last30days-run.py" <engine args>
"""
import glob
import os
import runpy
import sys

import truststore

truststore.inject_into_ssl()

# The X client (bird-search) is a Node subprocess. The engine strips
# NODE_USE_SYSTEM_CA from its env but keeps NODE_OPTIONS, so pass the
# Windows-store flag there or every X call fails with "fetch failed".
_node_opts = os.environ.get("NODE_OPTIONS", "")
if "--use-system-ca" not in _node_opts:
    os.environ["NODE_OPTIONS"] = (_node_opts + " --use-system-ca").strip()

# OPENROUTER_API_KEY is a Windows user variable kept for other apps. last30days
# would use it for paid reranking (HTTP 402 on 2026-10-29: no credits), so hide
# it from this process only; ranking falls back to local and Claude judges leads.
os.environ.pop("OPENROUTER_API_KEY", None)

CACHE =r"C:\TRANSDEV HUB\5-brain\plugins\cache\last30days-skill\last30days"


def _version_key(path):
    ver = os.path.basename(path)
    return tuple(int(p) if p.isdigit() else 0 for p in ver.split("."))


versions = sorted(glob.glob(os.path.join(CACHE, "*")), key=_version_key)
if not versions:
    sys.exit("last30days plugin not found in " + CACHE)
engine = os.path.join(versions[-1], "skills", "last30days", "scripts", "last30days.py")
sys.argv = [engine] + sys.argv[1:]
sys.path.insert(0, os.path.dirname(engine))
runpy.run_path(engine, run_name="__main__")
