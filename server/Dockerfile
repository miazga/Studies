FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY src/Server.Api/*.csproj ./src/Server.Api/
COPY src/Server.WebSocketManager/*.csproj ./src/Server.WebSocketManager/
RUN ls
RUN dotnet restore

# copy everything else and build app
COPY src/. ./src/
WORKDIR /app
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:3.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "Server.Api.dll"]
