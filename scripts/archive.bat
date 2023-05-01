@echo off
REM archive.bat

call npm install webpack webpack-cli webpack-dev-server @babel/core @babel/preset-env babel-loader --save-dev
call npx webpack --config webpack.config.js
set zipfile=aesr-s3-config-sender.zip

if not exist dist mkdir dist
if exist dist\%zipfile% del dist\%zipfile%
powershell Compress-Archive -Path manifest.json, *.html, icons\, js\, css\ -DestinationPath .\dist\%zipfile%
echo archived: dist\%zipfile%