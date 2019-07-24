const { validationResult } = require('express-validator/check');
const Const = require('../../../helper/constant.helper');
const { logger } = require('../../../middleware/logs');

const {
	getUserListQuery
} = require('./users.query');

const getUserList = async (req, res) => {
	logger.info("getUserListQuery Info ");

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		logger.info("getUserListQuery Info ");
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
		logger.error(
			`Failed to process getUserList,
			Req Body:` + req + `,
			Error Stack:` + e);
		return res.errorHandler(e);
	}
};

const getUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

module.exports = {
	getUserList,
	getUser
};
