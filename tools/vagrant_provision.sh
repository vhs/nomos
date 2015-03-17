#!/bin/sh
export DEBIAN_FRONTEND=noninteractive
sudo apt-get install python-software-properties
sudo add-apt-repository --yes ppa:ondrej/php5-5.6
sudo apt-get update
sudo apt-get install --yes -q php5 php5-fpm php5-cli php5-mysqlnd
sudo apt-get install --yes -q mysql-server mysql-client 
sudo apt-get install --yes -q nginx

# configure nginx
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /vagrant/conf/nginx-vhost-vagrant.conf /etc/nginx/sites-enabled/mmp 
sudo service nginx restart

# configure app    
cp /vagrant/conf/config.ini.php.template /vagrant/conf/config.ini.php

# configure database
mysqladmin -u root password hackspace
# sudo sed -i 's/127.0.0.1/0.0.0.0/g' /opt/bitnami-nginxstack/mysql/my.cnf 
mysql --host=localhost --user=root --password=hackspace -e 'CREATE DATABASE vhs_membership;'
mysql --host=localhost --user=root --password=hackspace -e "GRANT ALL PRIVILEGES ON vhs_membership.* TO 'vhs_membership'@'127.0.0.1' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"
mysql --host=localhost --user=root --password=hackspace -e "GRANT ALL PRIVILEGES ON vhs_membership.* TO 'vhs_membership'@'localhost' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"