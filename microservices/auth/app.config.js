//Environment varialbles from config file.

const dotenv = require('dotenv');

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
	const config = dotenv.config();
	if (config.error) {
		throw config.error;
	}
}

const { authenticate } = require('./middleware/authentication');

/** APP CONFIGURATION FILE  **/
module.exports.appModules = {
	'v1': {
		modules: [
			'auth',
			'users',
		],
		auth: authenticate.api
	}
};