#!/bin/sh

## DB Configuration
HOST=localhost
DB_NAME=ms
USERNAME=root
PASSWORD=experion
PORT=3306

OUT=./genarators/models
CONFIG=./genarators/model.genarator.json

## Installing sequelize-auto
if [! npm list -g | grep sequelize-auto]
then
	npm install -g sequelize-auto
fi

if [ ! -d $OUT ]; then
	mkdir -p $OUT;
fi

sequelize-auto -o $OUT -d $DB_NAME -h $HOST -u $USERNAME -p $PORT -x $PASSWORD -e mysql --config $CONFIG