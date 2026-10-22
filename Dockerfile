FROM ghcr.io/mpyw/php-eol-cve-2026-109618-109619:7.4-fpm

RUN docker-php-ext-install bcmath

RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
        curl \
        git \
        nginx \
    && apt-get clean && rm -r /var/lib/apt/lists/*

COPY ["composer.json", "/www/"]

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/www/ \
    && cd /www/ \
    && php composer.phar install \
    && echo "daemon off;" >> /etc/nginx/nginx.conf

COPY ["app", "/www/app"]
COPY ["web", "/www/web"]
COPY ["vhs", "/www/vhs"]
COPY ["migrations", "/www/migrations"]
COPY ["tools", "/www/tools"]
COPY ["conf/nginx-vhost-docker.conf", "/etc/nginx/sites-enabled/default"]
COPY ["docker", "/usr/bin"]
COPY ["conf/config.docker.ini.php", "/www/conf/config.ini.php"]

CMD ["/usr/bin/docker_run.sh"]
