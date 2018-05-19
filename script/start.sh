#!/bin/sh

cd /home/ubuntu/api

npm install

sudo pm2 start index.js 

