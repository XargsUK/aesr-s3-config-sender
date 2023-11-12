#!/bin/bash

# Store the current working directory
current_dir=$(pwd)

# Check if an argument was provided
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please specify 'chrome' or 'firefox'."
    exit 1
fi

browser_type=$1
npm install
npx webpack --config webpack.config.js

# Define variables
dist_dir="$current_dir/dist"
extension_dir="$dist_dir/extension"

# Choose the right manifest and zipfile based on the argument
case $browser_type in
    chrome)
        manifest_file="$current_dir/manifest-chrome.json"
        zipfile="$dist_dir/aesr-s3-config-sender-chrome.zip"
        ;;
    firefox)
        manifest_file="$current_dir/manifest-firefox.json"
        zipfile="$dist_dir/aesr-s3-config-sender-firefox.zip"
        ;;
    *)
        echo "Invalid argument. Please specify 'chrome' or 'firefox'."
        exit 1
        ;;
esac

# Create directories if they don't exist
mkdir -p $dist_dir
mkdir -p $extension_dir

# If the zip file exists, remove it
if [ -f $zipfile ]; then
    rm $zipfile
fi

echo "Updating credits..."
node ./bin/update_credits.js

# Remove everything in the extension directory
rm -rf $extension_dir/*

# Copy necessary files to the extension directory
cp -R $current_dir/icons/ $extension_dir/icons/
cp -R $current_dir/js/ $extension_dir/js/
cp -R $current_dir/css/ $extension_dir/css/
cp $current_dir/*.html $extension_dir/
cp $manifest_file $extension_dir/manifest.json

# Create the zip file
cd $extension_dir
zip -r $zipfile * 
cd $current_dir

echo "archived: $zipfile"
