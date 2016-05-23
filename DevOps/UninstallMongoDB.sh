echo "\n Welcome to Sigma DevOps"

echo "\n Uninstall MongoDB Script"

sudo service mongod stop

sudo apt-get purge mongodb-org*

sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb