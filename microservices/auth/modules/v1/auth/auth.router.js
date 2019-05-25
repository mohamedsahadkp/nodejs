const router = require('express').Router();

const {
	login,
	signup,
	updatePassword,
	resetPassword
} = require('./auth.service');

const {
	loginValidation,
	signupValidation
} = require('./auth.validation');


var routes = () => {
	router.route('/login')
		.post(loginValidation, login);

	router.route('/signup')
		.post(signupValidation, signup);

	router.route('/forgot-password')
		.patch(updatePassword);

	router.route('/reset-password')
		.patch(resetPassword);

	return router;
};

module.exports = { routes, path: 'auth' };
