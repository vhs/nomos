FROM php:fpm

ADD . .

RUN apt update && apt install -y zip
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install mysqli
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=.
RUN php composer.phar install
