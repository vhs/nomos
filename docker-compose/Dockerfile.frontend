FROM nginx:stable-alpine

COPY ["conf/nginx-vhost-docker-compose.conf", "/etc/nginx/conf.d/default.conf"]
COPY ["web", "/var/www/html"]