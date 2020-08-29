FROM nginx:1.13

RUN rm /etc/nginx/conf.d/default.conf

COPY config/nginx.conf /etc/nginx/conf.d/

COPY dist /var/www/se-faq

ENV API_BASE='/api'