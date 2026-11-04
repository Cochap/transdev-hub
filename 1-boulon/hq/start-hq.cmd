@echo off
rem Double-click to open the BOULON HQ control room (starts the local server if needed).
rem Walks up from this folder until it finds CLAUDE.md (the brain root), so the folder can move.
cd /d "%~dp0"
:up
if exist CLAUDE.md goto found
if "%cd%"=="%cd:~0,3%" goto found
cd ..
goto up
:found
curl.exe -s -o NUL -m 2 http://127.0.0.1:4777/api/state || start "BOULON HQ control room" /min node "%~dp0server.js"
timeout /t 2 /nobreak >nul
start "" http://127.0.0.1:4777/
