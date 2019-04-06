const router = require('express').Router();

const { 
	login,
	signup, 
	updatePassword 
} = require('./auth.service');

const { 
	loginValidation,
	signupValidation 
} = require('./auth.validation');


var routes = () => {
	// Not required in production
	router.route('/login')
		.post(loginValidation, login);
	
	router.route('/signup')
		.post(signupValidation, signup);

	// Feature is not required
	router.route('/forgot')
		.patch(updatePassword);

	return router;
};

module.exports = { routes, path: 'auth' };
