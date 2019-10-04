FROM nginx

ADD nginx.conf.template /etc/nginx/conf.d

CMD /bin/bash -c "envsubst '\${SERVER_NAME} \${SSL_CERTIFICATE_FILE} \${SSL_CERTIFICATE_KEY_FILE}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
