#!/bin/sh

set -x

export DEBIAN_FRONTEND=noninteractive

# get rid of warning as described here https://serverfault.com/a/717770
sudo ex +"%s@DPkg@//DPkg" -cwq /etc/apt/apt.conf.d/70debconf
sudo dpkg-reconfigure debconf -f noninteractive -p critical

sudo apt-get update
T=`which add-apt-repository`
if [ -z "`which add-apt-repository`" ]; then
  sudo apt-get install --yes software-properties-common
fi
sudo add-apt-repository --yes ppa:ondrej/php
sudo apt-get update

# install mysql
if [ -z "`which mysqld`" ]; then
  echo "mysql-server-5.7 mysql-server/root_password password password" | sudo debconf-set-selections
  echo "mysql-server-5.7 mysql-server/root_password_again password password" | sudo debconf-set-selections
  sudo apt-get install --yes -q mysql-server mysql-client
fi

# install php
sudo apt-get install --yes -q php7.0 php7.0-fpm php7.0-cli php7.0-mysqlnd php7.0-curl php7.0-dom php7.0-bcmath
sudo apt-get install --yes -q php7.0-dom php7.0-bcmath php7.0-mbstring php-xdebug php7.0-zip

# install nginx
sudo apt-get install --yes -q nginx

# configure nginx
if [ -e "/etc/nginx/sites-enabled/default" ]; then
  sudo rm /etc/nginx/sites-enabled/default
fi
sudo rm -f /etc/nginx/sites-enabled/nomos
sudo cp -f /vagrant/conf/nginx-vhost-vagrant.conf /etc/nginx/sites-enabled/nomos
sudo sed -i 's/sendfile on/sendfile off/g' /etc/nginx/nginx.conf
sudo service nginx restart

# configure php
sudo sed -i 's/;error_log = php_errors.log/error_log = \/var\/log\/php7.0-cli.log/g' /etc/php/7.0/cli/php.ini

# configure app
if [ ! -e "/vagrant/conf/config.ini.php" ]; then
  cp /vagrant/conf/config.ini.php.template /vagrant/conf/config.ini.php
fi

# add composer
if [ ! -e "/vagrant/composer.phar" ]; then
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/vagrant/
fi

# run composer
cd /vagrant/
php composer.phar install

# configure database
sudo sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/my.cnf
if [ -z `mysql --host=localhost --user=root --password=password -s -N -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='nomos';"` ]; then
  mysql --host=localhost --user=root --password=password -e 'CREATE DATABASE nomos;'
  mysql --host=localhost --user=root --password=password -e "CREATE USER 'vhs'@'%' IDENTIFIED BY 'password';"
  mysql --host=localhost --user=root --password=password -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"
  mysql --host=localhost --user=root --password=password -e "GRANT ALL PRIVILEGES ON nomos.* TO 'vhs'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"
fi

touch /vagrant/app/sql.log
touch /vagrant/app/server.log
chmod 777 /vagrant/app/sql.log
chmod 777 /vagrant/app/server.log
      
touch /vagrant/logs/sql.log
touch /vagrant/logs/server.log
chmod -R a+w /vagrant/logs

# migrate database
cd /vagrant/tools
php migrate.php -m

# rabbitmq

echo "deb http://www.rabbitmq.com/debian/ testing main" | sudo tee -a /etc/apt/sources.list

# remove duplicate files
uniq /etc/apt/sources.list > /tmp/sources.list.uniq
sudo mv /tmp/sources.list.uniq /etc/apt/sources.list

# install rabbitmq
wget -O - 'https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc' | sudo apt-key add -
sudo apt-get update
sudo apt-get install --yes -q rabbitmq-server
sudo rabbitmq-plugins enable rabbitmq_management
sudo rabbitmqctl add_user vhs password
sudo rabbitmqctl set_user_tags vhs administrator
sudo rabbitmqctl add_user nomos password
sudo rabbitmqctl add_user webhooker password
sudo rabbitmqctl add_vhost nomos
sudo rabbitmqctl set_permissions -p nomos vhs ".*" ".*" ".*"
sudo rabbitmqctl set_permissions -p nomos nomos ".*" ".*" ".*"
sudo rabbitmqctl set_permissions -p nomos webhooker "" "" ".*"

# install nodejs
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs npm
sudo npm install -g npm

# install webhooker modules
cd /vagrant/webhooker/
npm install

sudo apt-get install --yes -q jq

# webhooker nomos permissions
APIKEY=$(curl -s http://vhs:password@localhost/services/web/ApiKeyService1.svc/GenerateSystemApiKey?notes=webhooker)

if [ ! `curl -s http://vhs:password@localhost/services/web/PrivilegeService1.svc/GetAllPrivileges | jq -r .[] | jq -r .code | grep webhook` ]; then
  curl -s http://vhs:password@localhost/services/web/PrivilegeService1.svc/CreatePrivilege?name=webhook\&code=webhook\&description=webhook\&icon=webhook\&enabled=true
fi

curl -s http://vhs:password@localhost/services/web/ApiKeyService1.svc/PutApiKeyPrivileges?keyid=$(echo $APIKEY | jq -r .id)\&privileges=webhook

APIKEY=$(echo $APIKEY | jq .key)

# configure webhooker
if [ ! -e "/vagrant/webhooker/config.js" ]; then
  cp /vagrant/webhooker/config.js.template.js /vagrant/conf/config.js
  sed -i -e 's/token: ""/token: '$APIKEY'/g' /vagrant/webhooker/config.js
fi

chmod 777 /vagrant/webhooker/webhooker.sbin
sudo ln -s /vagrant/webhooker/webhooker.sbin /usr/sbin/webhooker

sudo cp /vagrant/webhooker/webhooker.service /lib/systemd/system/webhooker.service

sudo systemctl enable webhooker.service
sudo systemctl start webhooker.service

