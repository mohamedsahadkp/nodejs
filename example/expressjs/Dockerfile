FROM node:8-alpine
# Module : MapHabit - User MS
# Envi : Development

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN apk update && apk upgrade && \
 apk add --no-cache bash git openssh
RUN npm install pm2 -g
RUN npm i yarn -g
RUN yarn install
EXPOSE 3002
CMD ["pm2-runtime", "app.js"]
