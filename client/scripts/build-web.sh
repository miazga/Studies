#!/bin/bash
rm -rf ../server/src/Server.Api/wwwroot/
rm -rf ./web-build/
expo build:web
cp -r web-build/ ../server/src/Server.Api/wwwroot
echo "Build completed! wwwroot in Server.Api has been updated."