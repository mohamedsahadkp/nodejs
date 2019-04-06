const Sequelize = require('sequelize');
const Config = require('./../config/config.json')

const connectionString = Config.development.MYSQL_URI;
const options = {
	dialect : 'mysql',
	logging: true
};

const connection = new Sequelize(connectionString, options);

module.exports = connection;