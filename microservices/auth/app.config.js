/* ----------------------------------------------------------------------
*  Creating environment varialbles from config file.
*  PLEASE DO'T EDIT THE BELOW LINES
*  ----------------------------------------------------------------------*/

const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
	const config = require('./config/config.json');
	const envConfig = config[env];

	Object.keys(envConfig).forEach((key) => {
		process.env[key] = envConfig[key];
	});
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