@echo off
rem Opens the Workshop ID Card app. Double-clicking index.html does not work (the browser blocks its data files).
cd /d "%~dp0"
start "" http://127.0.0.1:8765/index.html
uv run --no-project python -I -m http.server 8765 --bind 127.0.0.1
