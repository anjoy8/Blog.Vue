FROM nginx
MAINTAINER vueblog
ADD dist /usr/share/nginx/html
ADD vueblog.nginx.conf /etc/nginx/nginx.conf
RUN chown nginx:nginx -R /usr/share/nginx/html
EXPOSE 80
RUN echo 'build blog image successful!!'
