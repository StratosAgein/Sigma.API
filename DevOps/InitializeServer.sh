#!/bin/bash

echo "\n Welcome to Sigma DevOps"

echo "======== NODE.JS ========="

echo "\n Updating Ubuntu ..."
sudo apt-get update

echo "\n Installing Node.js ..."
sudo apt-get install nodejs

echo "\n Installing NPM ..."
sudo apt-get install npm

echo "\n Changing nodejs to node ENV ..."
sudo ln -s "$(which nodejs)" /usr/bin/node

echo "======== GIT ========="

echo "\n Preparing to installing Git"
sudo apt-get update

echo "\n Installing Git"
sudo apt-get install git