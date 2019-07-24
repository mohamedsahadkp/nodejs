const router = require('express').Router();
import { getUserList, getUser } from './users.service';
import {} from './users.validation';

var routes = (authenticate) => {
	router.route('/')
		.get(getUserList);
	router.route('/id')
		.get(getUser);
	return router;
}; 	

export default { routes, path: 'users' };
