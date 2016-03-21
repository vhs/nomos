#!/bin/sh
export DEBIAN_FRONTEND=noninteractive

sudo apt-get update
T=`which add-apt-repository`
if [ -z "`which add-apt-repository`" ]; then
  sudo apt-get install --yes software-properties-common
fi
sudo add-apt-repository --yes ppa:ondrej/php5-5.6
sudo apt-get update

if [ -z "`which mysqld`" ]; then
  echo "mysql-server-5.5 mysql-server/root_password password password" | sudo debconf-set-selections
  echo "mysql-server-5.5 mysql-server/root_password_again password password" | sudo debconf-set-selections
  sudo apt-get install --yes -q mysql-server mysql-client
fi
sudo apt-get install --yes -q php5 php5-fpm php5-cli php5-mysqlnd php5-curl
sudo apt-get install --yes -q nginx

# configure nginx
if [ -e "/etc/nginx/sites-enabled/default" ]; then
  sudo rm /etc/nginx/sites-enabled/default
fi
sudo rm -f /etc/nginx/sites-enabled/nomos
sudo cp -f /vagrant/conf/nginx-vhost-vagrant.conf /etc/nginx/sites-enabled/nomos
sudo sed -i 's/sendfile on/sendfile off/g' /etc/nginx/nginx.conf
sudo service nginx restart

# configure app
if [ ! -e "/vagrant/conf/config.ini.php" ]; then
  cp /vagrant/conf/config.ini.php.template /vagrant/conf/config.ini.php
fi

# add composer
if [ ! -e "/vagrant/composer.phar" ]; then
  curl -sS https://getcomposer.org/installer | php -- --install-dir=/vagrant/
fi

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

cd /vagrant/tools
php migrate.php -m

# rabbitmq


echo "deb http://www.rabbitmq.com/debian/ testing main" | sudo tee -a /etc/apt/sources.list
wget https://www.rabbitmq.com/rabbitmq-signing-key-public.asc
sudo apt-key add rabbitmq-signing-key-public.asc
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

curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g npm

cd /vagrant/webhooker/
npm install

sudo apt-get install --yes -q jq


APIKEY=$(curl -s http://vhs:password@localhost/services/web/ApiKeyService1.svc/GenerateSystemApiKey?notes=webhooker)

if [ ! `curl -s http://vhs:password@localhost/services/web/PrivilegeService1.svc/GetAllPrivileges | jq -r .[] | jq -r .code | grep webhook` ]; then
  curl -s http://vhs:password@localhost/services/web/PrivilegeService1.svc/CreatePrivilege?name=webhook\&code=webhook\&description=webhook\&icon=webhook\&enabled=true
fi

curl -s http://vhs:password@localhost/services/web/ApiKeyService1.svc/PutApiKeyPrivileges?keyid=$(echo $APIKEY | jq -r .id)\&privileges=webhook

APIKEY=$(echo $APIKEY | jq .key)

# configure app
if [ ! -e "/vagrant/webhooker/config.js" ]; then
  cp /vagrant/webhooker/config.js.template.js /vagrant/conf/config.js
  sed -i -e 's/token: ""/token: '$APIKEY'/g' /vagrant/webhooker/config.js
fi

npm start
=======
