#!/bin/bash

RED="\033[1;31m"
GREEN="\033[1;32m"
NOCOLOR="\033[0m"

echo -e "\n\n"

if type -P git
  then
    echo -e "${GREEN}git is installed ($(git --version))${NOCOLOR}"
  else
    echo -e "${RED}git not installed${NOCOLOR}"
fi

if type -P node
  then
    echo -e "${GREEN}node is installed ($(node --version))${NOCOLOR}"
  else
    echo -e "${RED}node not installed${NOCOLOR}"
fi

if type -P yarn
  then
    echo -e "${GREEN}yarn is installed ($(yarn --version))${NOCOLOR}"
  else
    echo -e "${RED}yarn not installed${NOCOLOR}"
fi

if type -P expo-cli
  then
    echo -e "${GREEN}expo-cli is installed ($(expo-cli --version))${NOCOLOR}"
  else
    echo -e "${RED}expo-cli not installed${NOCOLOR}"
fi

if type -P docker
  then
    echo -e "${GREEN}docker is installed ($(docker --version))${NOCOLOR}"
  else
    echo -e "${RED}docker not installed${NOCOLOR}"
fi


if type -P dotnet
  then
    echo -e "${GREEN}dotnet is installed ($(dotnet --version))${NOCOLOR}"
  else
    echo -e "${RED}dotnet not installed${NOCOLOR}"
fi

