ARG PHP_VERSION=8.3

FROM cimg/php:${PHP_VERSION}-node AS build

USER 1001:1002

WORKDIR /build/

ENV DEBIAN_FRONTEND=noninteractive

COPY --chown=circleci:circleci ./ ./

RUN npm ci && cd webhooker && npm ci

FROM php:${PHP_VERSION}-fpm AS backend

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /var/www/html

ENTRYPOINT [ "docker_compose_run.sh" ]
CMD ["php-fpm"]

RUN apt-get update \
    && apt-get install -y git libzip-dev mariadb-client zip \
    && docker-php-ext-install -j$(nproc) bcmath mysqli zip \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

COPY --from=build /build/app/ app/
COPY --from=build /build/migrations/ migrations/
COPY --from=build /build/tools/ tools/
COPY --from=build /build/vhs/ vhs/
COPY --from=build /build/vendor/ vendor/

COPY --from=build /build/docker/*.sh /usr/local/bin/
COPY --from=build /build/conf/config.docker.ini.php /var/www/html/conf/config.ini.php

RUN cp "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

FROM nginx:stable-alpine AS frontend

COPY conf/nginx-vhost-docker-compose.conf /etc/nginx/conf.d/default.conf

COPY --from=build /build/web/ /var/www/html/

FROM build AS webhooker-build

WORKDIR /build/webhooker

RUN chmod 755 webhooker.sbin webhooker.console \
    && cp config.docker.js config.js

FROM node:lts AS webhooker

RUN mkdir -p /app/logs /app/webhooker

COPY --from=webhooker-build /build/webhooker/ /app/webhooker/

WORKDIR /app/webhooker

CMD ["/app/webhooker/webhooker.sbin"]
