FROM ubuntu:trusty

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv-keys E5267A6C && \
    echo 'deb http://ppa.launchpad.net/ondrej/php5-5.6/ubuntu trusty main' > /etc/apt/sources.list.d/ondrej-php5-trusty.list && \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        curl \
        git \
        php5 \
        php5-cli \
        php5-curl \
        php5-fpm \
        php5-mysqlnd \
        nginx \
	&& apt-get clean && rm -r /var/lib/apt/lists/*

COPY ["app", "/www/app"]
COPY ["web", "/www/web"]
COPY ["vhs", "/www/vhs"]
COPY ["tools", "/www/tools"]
COPY ["composer.json", "/www/"]

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/www/ && \
    cd /www/ && \
    php composer.phar install

COPY ["conf/nginx-vhost-docker.conf", "/etc/nginx/sites-enabled/default"]
COPY ["docker", "/usr/bin"]
COPY ["conf/config.ini.php.docker", "/www/conf/config.ini.php"]

RUN echo "daemon off;" >> /etc/nginx/nginx.conf 
