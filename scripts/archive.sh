@echo off
REM archive.bat

set zipfile=aesr-s3-config-sender.zip

cd dist\chrome
del %zipfile%
powershell Compress-Archive -Path manifest.json, *.html, icons\, js\, css\ -DestinationPath ..\..\%zipfile%
echo archived: chrome\%zipfile%