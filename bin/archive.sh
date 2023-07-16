#!/bin/bash
#--
# archive.sh
#--
zipfile=aesr-s3-config-sender.zip

cd dist/chrome;
\rm $zipfile
zip -r $zipfile \
  manifest.json *.html icons/ js/ 
echo "archived: chrome/$zipfile"

echo "----"

cd ../firefox;
\rm $zipfile
zip -r $zipfile \
  manifest.json *.html icons/ js/ 

echo "archived: firefox/$zipfile"
