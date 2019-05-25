const router = require('express').Router();
const {
	getUserList
} = require('./users.service');

const {
} = require('./users.validation');

var routes = (authenticate) => {
	router.route('/')
		.get(getUserList);

	return router;
};
module.exports = { routes, path: 'users' };
