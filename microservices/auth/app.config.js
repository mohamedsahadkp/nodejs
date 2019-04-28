//Environment Config
const { authenticate } = require('./middleware/authentication');

module.exports.appModules = {
	'v1': {
		modules: [
			'auth',
			'users',
		],
		auth: authenticate.user
	}
};