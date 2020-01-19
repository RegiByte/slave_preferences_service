FROM node:12.14.1
MAINTAINER Reginaldo Junior <reginaldo.junior696@gmail.com>

WORKDIR '/app'

COPY ./entrypoint /usr/local/bin

RUN chmod +x /usr/local/bin/entrypoint

ENTRYPOINT ["entrypoint"]
