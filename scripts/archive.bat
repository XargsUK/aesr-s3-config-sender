@echo off
REM archive.bat

call npm install webpack webpack-cli webpack-dev-server @babel/core @babel/preset-env babel-loader @aws-sdk/client-cognito-identity @aws-sdk/client-cognito-identity-provider @aws-sdk/credential-provider-cognito-identity @aws-sdk/client-sts npm install bootstrap@5.3.0-alpha3 css-loader style-loader mini-css-extract-plugin @popperjs/core jquery
call npx webpack --config webpack.config.js
set zipfile=aesr-s3-config-sender.zip

if not exist dist mkdir dist
if exist dist\%zipfile% del dist\%zipfile%
powershell Compress-Archive -Path manifest.json, *.html, icons\, js\, css\ -DestinationPath .\dist\%zipfile%
echo archived: dist\%zipfile%

if not exist dist\extension mkdir dist\extension
rmdir /s /q dist\extension
xcopy /e /i /y icons\ dist\extension\icons\
xcopy /e /i /y js\ dist\extension\js\
xcopy /e /i /y css\ dist\extension\css\
robocopy .\ .\dist\extension *.html
copy /y manifest.json dist\extension\
echo copied files to: dist\extension\