const { validationResult } = require('express-validator/check');
var rp = require('request-promise');
const Config = require('./../../../config/config.json');
const Const = require('../../../helper/constant.helper');

const {
	getUserListQuery
} = require('./users.query');

const getUserList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const userList = await getUserListQuery();
		if (userList) {
			return res.status(200).return(userList);
		} else {
			return res.status(401).message('not-authorized').return();
		}
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

module.exports = { 
	getUserList
};
