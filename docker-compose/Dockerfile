ARG PHP_VERSION=8.3

FROM scratch AS source

WORKDIR /build/

COPY ./ ./

FROM node:lts-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm install -g npm@latest && npm install -g corepack@latest

FROM base AS build-base

RUN apk --no-cache add alpine-sdk bash git just php83 php83-bcmath php83-common php83-curl php83-dom php83-mbstring php83-mysqli php83-mysqlnd php83-openssl php83-phar php83-simplexml php83-tokenizer php83-xml php83-xmlwriter php83-zip python3 wget

FROM build-base AS build

ENV COMPOSER_INSTALL_OPT=--no-dev
ENV CI=true

RUN mkdir /app/ /build/ && chown node:node /build/ /app/

USER node:node

COPY --from=source --chown=node:node /build/ /build/

WORKDIR /build/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store,uid=1000,gid=1000 pnpm install --frozen-lockfile
RUN pnpm deploy --filter="@vhs/webhooker" --prod /app/webhooker/

FROM alpine:3 AS backend-base

RUN apk --no-cache add just php83 php83-bcmath php83-common php83-fpm php83-mysqli php83-mysqlnd php83-openssl php83-zip python3 wget

VOLUME ["/sessions"]

RUN mkdir -p /sessions && chown nobody:nobody /sessions

RUN echo "session.save_path = \"/sessions\"" > /etc/php83/conf.d/99_sessions.ini

FROM backend-base AS backend

WORKDIR /var/www/html

ENTRYPOINT [ "docker_compose_run.sh" ]
CMD ["php-fpm"]

COPY --from=build /build/app/ app/
COPY --from=build /build/migrations/ migrations/
COPY --from=build /build/tools/ tools/
COPY --from=build /build/vhs/ vhs/
COPY --from=build /build/vendor/ vendor/

COPY --from=build /build/docker/*.sh /usr/local/bin/
COPY --from=build /build/conf/config.docker.ini.php /var/www/html/conf/config.ini.php

FROM nginx:stable-alpine AS frontend

COPY conf/nginx-vhost-docker-compose.conf /etc/nginx/conf.d/default.conf

COPY --from=build /build/web/ /var/www/html/

FROM base AS webhooker-base

RUN apk --no-cache add bash

FROM webhooker-base AS webhooker

USER node:node

WORKDIR /app/webhooker

COPY --from=build /app/webhooker/ /app/webhooker/

RUN mkdir -p /app/logs /app/webhooker

CMD ["/app/webhooker/webhooker.sbin"]
