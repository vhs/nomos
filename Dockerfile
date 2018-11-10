FROM ubuntu:xenial

RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y \
        curl \
        git \
        php7.0 \
        php7.0-bcmath \
        php7.0-cli \
        php7.0-curl \
        php7.0-dom \
        php7.0-fpm \
        php7.0-mbstring \
        php7.0-mysqlnd \
        nginx \
	&& apt-get clean && rm -r /var/lib/apt/lists/*

COPY ["composer.json", "/www/"]

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/www/ && \
    cd /www/ && \
    php composer.phar install && \
    echo "daemon off;" >> /etc/nginx/nginx.conf

COPY ["app", "/www/app"]
COPY ["web", "/www/web"]
COPY ["vhs", "/www/vhs"]
COPY ["migrations", "/www/migrations"]
COPY ["tools", "/www/tools"]
COPY ["conf/nginx-vhost-docker.conf", "/etc/nginx/sites-enabled/default"]
COPY ["docker", "/usr/bin"]
COPY ["conf/config.ini.php.docker", "/www/conf/config.ini.php"]

CMD ["/usr/bin/docker_run.sh"]
