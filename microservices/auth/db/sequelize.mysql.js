const Sequelize = require('sequelize');

const connectionString = process.env.MYSQL_URI;
console.log("COnn :  " + connectionString);

const options = {
	dialect : 'mysql',
	logging: true
};

const connection = new Sequelize(connectionString, options);

module.exports = connection;