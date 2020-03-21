#!/bin/sh
set -e
rabbitmq-server & dotnet Server.Api.dll
