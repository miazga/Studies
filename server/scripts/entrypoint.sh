#!/bin/sh
set -e
rabbitmq-server & dotnet app/Server.Api.dll
