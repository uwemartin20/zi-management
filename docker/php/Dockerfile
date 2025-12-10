FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    zip unzip git curl libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && find /var/www/html -type f -exec chmod 644 {} \; \
    && find /var/www/html -type d -exec chmod 755 {} \; \
    && chmod -R 775 storage bootstrap/cache
