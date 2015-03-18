#!/bin/sh
export DEBIAN_FRONTEND=noninteractive
T=`which add-apt-repository`
if [ -z "`which add-apt-repository`" ]; then
  sudo apt-get install --yes software-properties-common
fi
sudo add-apt-repository --yes ppa:ondrej/php5-5.6
sudo apt-get update

if [ -z "`which mysqld`" ]; then
  echo "mysql-server-5.5 mysql-server/root_password password hackspace" | sudo debconf-set-selections
  echo "mysql-server-5.5 mysql-server/root_password_again password hackspace" | sudo debconf-set-selections
  sudo apt-get install --yes -q mysql-server mysql-client
fi
sudo apt-get install --yes -q php5 php5-fpm php5-cli php5-mysqlnd
sudo apt-get install --yes -q nginx

# configure nginx
if [ -e "/etc/nginx/sites-enabled/default" ]; then
  sudo rm /etc/nginx/sites-enabled/default
fi
sudo rm -f /etc/nginx/sites-enabled/mmp
sudo cp -f /vagrant/conf/nginx-vhost-vagrant.conf /etc/nginx/sites-enabled/mmp
sudo sed -i 's/sendfile on/sendfile off/g' /etc/nginx/nginx.conf
sudo service nginx restart

# configure app
if [ ! -e "/vagrant/conf/config.ini.php" ]; then
  cp /vagrant/conf/config.ini.php.template /vagrant/conf/config.ini.php
fi

# configure database
# sudo sed -i 's/127.0.0.1/0.0.0.0/g' /opt/bitnami-nginxstack/mysql/my.cnf
if [ -z `mysql --host=localhost --user=root --password=hackspace -s -N -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='vhs_membership';"` ]; then 
  mysql --host=localhost --user=root --password=hackspace -e 'CREATE DATABASE vhs_membership;'
  mysql --host=localhost --user=root --password=hackspace -e "GRANT ALL PRIVILEGES ON vhs_membership.* TO 'vhs_membership'@'127.0.0.1' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"
  mysql --host=localhost --user=root --password=hackspace -e "GRANT ALL PRIVILEGES ON vhs_membership.* TO 'vhs_membership'@'localhost' IDENTIFIED BY 'password'; FLUSH PRIVILEGES;"
fi
