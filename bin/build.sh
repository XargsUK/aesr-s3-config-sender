#!/bin/bash

npm install
npx webpack --config webpack.config.js
zipfile="aesr-s3-config-sender.zip"

# Create directories if they don't exist
mkdir -p dist
mkdir -p dist/extension

# If the zip file exists, remove it
if [ -f dist/$zipfile ]; then
    rm dist/$zipfile
fi

echo "Updating credits..."
node ./bin/update_credits.js

# Create a zip file
zip -r dist/$zipfile manifest.json *.html icons/ js/ css/
echo "archived: dist/$zipfile"

# Remove everything in the extension directory
rm -rf dist/extension/*

# Copy directories
cp -R icons/ dist/extension/icons/
cp -R js/ dist/extension/js/
cp -R css/ dist/extension/css/

# Copy .html files
cp *.html dist/extension/

# Copy manifest.json
cp manifest.json dist/extension/

echo "copied files to: dist/extension/"
