#!/bin/bash
expo build:web
cp -r web-build/ ../server/src/Server.Api/wwwroot
echo "Build completed! wwwroot in Server.Api has been updated."