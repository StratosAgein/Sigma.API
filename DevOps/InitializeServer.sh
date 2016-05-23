#!/bin/bash
## Bash script for initialize server 

PROJECT2CLONE = ""
ISMONGOSERVER = ""

# Getting options
while getopts p:m: opts; do
   case ${opts} in
      p) PROJECT2CLONE=${OPTARG} ;;
      m) ISMONGOSERVER=${OPTARG} ;;
   esac
done

# Install Node.js function without options
function installNode {
    echo "======== NODE.JS ========="

    echo "\n Updating Ubuntu ..."
    sudo apt-get update

    echo "\n Installing Node.js ..."
    sudo apt-get install nodejs

    echo "\n Installing NPM ..."
    sudo apt-get install npm

    echo "\n Changing nodejs to node ENV ..."
    sudo ln -s "$(which nodejs)" /usr/bin/node
}

# Install Git function without clone 
function installGit{
    echo "======== GIT ========="

    echo "\n Preparing to installing Git"
    sudo apt-get update

    echo "\n Installing Git"
    sudo apt-get install git
}

# Install MongoDB without settings only on Ubuntu 14.04
function installMongo{
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    
    sudo apt-get update
    
    sudo apt-get install -y mongodb-org
    
    sudo mkdir /var/lib/mongodb
    
    sudo mkdir /var/log/mongodb
    
    sudo service mongod start
}

# Clone project from parameters
function cloneProject{
    if["$1" = true]; then
        mkdir $2
    fi
    
    git clone $PROJECT2CLONE
}

echo "\n Welcome to Sigma DevOps"

echo "\n Initializing server script"

installGit

if["$ISMONGOSERVER" = true]; then
    installNode
    cloneProject false
else
    installMongo
fi