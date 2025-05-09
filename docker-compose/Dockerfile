ARG PHP_VERSION=8.3

FROM scratch AS source

WORKDIR /build

COPY --link ./ ./

FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g npm@latest && npm install -g corepack@latest

FROM base AS build-base

RUN apk --no-cache add just mariadb-client php83-bcmath php83-common php83-curl php83-dom php83-iconv php83-mbstring php83-mysqli php83-mysqlnd php83-openssl php83-phar php83-session php83-simplexml php83-sockets php83-zip php83 python3 wget alpine-sdk bash git php83-tokenizer php83-xml php83-xmlwriter

FROM build-base AS build

ENV COMPOSER_INSTALL_OPT=--no-dev

ENV CI=true

RUN mkdir /app/ /build/ && chown 1000:1000 /build/ /app/

USER 1000:1000

COPY --from=source --chown=1000:1000 --link /build /build

WORKDIR /build

RUN --mount=type=cache,id=nomos-pnpm,target=/pnpm/store,uid=1000,gid=1000 pnpm install --frozen-lockfile && pnpm -r build

FROM scratch AS build-backend-php

WORKDIR /build

COPY --from=build --link /build/packages/backend-php/ /app/backend-php/

FROM scratch AS build-frontend-react

WORKDIR /build

COPY --from=build --link /build/packages/frontend-react/conf/ /app/frontend-react/conf/

COPY --from=build --link /build/packages/frontend-react/dist/ /app/frontend-react/dist/

FROM scratch AS build-frontend-web

WORKDIR /build

COPY --from=build --link /build/packages/frontend-web/ /app/frontend-web/

FROM build AS build-webhooker

WORKDIR /build

RUN --mount=type=cache,id=nomos-pnpm,target=/pnpm/store,uid=1000,gid=1000 pnpm deploy --filter="@vhs/webhooker" --prod /app/webhooker/

FROM alpine:3 AS backend-php-base

RUN apk --no-cache add just mariadb-client php83-bcmath php83-common php83-curl php83-dom php83-iconv php83-mbstring php83-mysqli php83-mysqlnd php83-openssl php83-phar php83-session php83-simplexml php83-sockets php83-zip php83 python3 wget php83-fpm

RUN sed -i 's/^listen/;listen/g' /etc/php83/php-fpm.d/www.conf

FROM base AS webhooker-base

RUN apk --no-cache add bash

FROM backend-php-base AS backend-php

VOLUME ["/sessions"]

EXPOSE 9000/tcp

WORKDIR /var/www/html

VOLUME ["/var/www/html/backup"]

RUN mkdir -p /var/www/html/backup && chown nobody:nobody /var/www/html/backup

ENTRYPOINT ["docker_compose_run.sh"]

CMD ["php-fpm83"]

RUN mkdir -p /var/www/html/conf/

COPY --from=source --link /build/migrations/ migrations/

COPY --from=build-backend-php --link /app/backend-php/app/ app/

COPY --from=build-backend-php --link /app/backend-php/conf/config.docker.ini.php conf/config.ini.php

COPY --from=build-backend-php --link /app/backend-php/tools/ tools/

COPY --from=build-backend-php --link /app/backend-php/vhs/ vhs/

COPY --from=build-backend-php --link /app/backend-php/vendor/ vendor/

COPY --from=build-backend-php --link /app/backend-php/conf/php/*.ini /etc/php83/conf.d/

COPY --from=build-backend-php --link /app/backend-php/conf/php-fpm/*.conf /etc/php83/php-fpm.d/

COPY --from=build-backend-php --link /app/backend-php/docker/*.sh /usr/local/bin/

FROM nginx:stable-alpine AS frontend-react

COPY --from=build-frontend-react --link /app/frontend-react/conf/nginx-react-docker-compose.conf /etc/nginx/conf.d/default.conf

COPY --from=build-frontend-react --link /app/frontend-react/dist/ /var/www/html/

FROM nginx:stable-alpine AS frontend-web

COPY --from=build-frontend-web --link /app/frontend-web/conf/nginx-vhost-docker-compose.conf /etc/nginx/conf.d/default.conf

COPY --from=build-frontend-web --link /app/frontend-web/web/ /var/www/html/

FROM webhooker-base AS webhooker

USER 1000:1000

WORKDIR /app

RUN mkdir -p /app/logs /app/webhooker && chown 1000:1000 /app/logs /app/webhooker

WORKDIR /app/webhooker

COPY --from=build-webhooker --link /app/webhooker/ /app/webhooker/

CMD ["/app/webhooker/webhooker.sbin"]
