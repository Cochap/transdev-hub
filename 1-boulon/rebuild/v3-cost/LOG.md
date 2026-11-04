# v3-cost working log (append only)

Rules for this log: every entry has a clock time, what was done, and the count of Azure calls. Azure calls are also recorded one per line in `azure-call-log.jsonl` (time, method, path, HTTP code; never a key).

| Clock | What | Azure calls |
|---|---|---|
| 16:58 | Session start. Read map, brief, continuity log, cost files, research A, v2 files, test scripts. Wrote nothing to Azure. Probe: 12 read-only GETs (servicestats, object lists) against the live Free service: all HTTP 200; indexer `schedule` = null (it cannot run by itself) | 12 GET |
