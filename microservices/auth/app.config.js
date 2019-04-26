//Environment Config
const dotenv = require('dotenv');
const { authenticate } = require('./middleware/authentication');

const env = process.env.NODE_ENV || 'development';
console.log('NodeJS Env :' + env);

if (env === 'development') {
	const config = dotenv.config();
	if (config.error) {
		throw config.error;
	}
} 
module.exports.appModules = {
	'v1': {
		modules: [
			'auth',
			'users',
		],
		auth: authenticate.user
	}
};