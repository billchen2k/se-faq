FROM nginx:1.13

ENV API_BASE=/api

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

COPY dist /www

