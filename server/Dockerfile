FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /app

COPY *.sln .
COPY src/Server.Api/*.csproj ./src/Server.Api/
RUN dotnet restore

COPY src/. ./src/
WORKDIR /app
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-bionic as runtime
FROM rabbitmq:3-management as rabbit
WORKDIR /
COPY --from=runtime . ./
COPY --from=build /app/out ./
COPY scripts/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]