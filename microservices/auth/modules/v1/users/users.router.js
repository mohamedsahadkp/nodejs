const router = require('express').Router();
const {
	getUserList,
	getUser
} = require('./users.service');

const {
} = require('./users.validation');

var routes = (authenticate) => {
	router.route('/')
		.get(getUserList);

	router.route('/id')
		.get(getUser);

	return router;
};
module.exports = { routes, path: 'users' };
