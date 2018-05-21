#!/bin/sh

cd /home/ubuntu/api

npm install

pm2 start index.js 

