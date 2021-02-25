FROM node:12-alpine
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
# RUN apk update && apk upgrade && \
#  apk add --no-cache bash git openssh
# RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install pm2 -g
RUN npm ci
CMD ["pm2-runtime", "src/app.js"]