const { validationResult } = require('express-validator/check');

const {
} = require('./auth.query');

const signup = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}
	
	try {
		return res.status(200).message('success').return({ "status": "OK" });
	} catch(e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		return res.status(200).message('success').return({ "status": "OK" });
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const updatePassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		return res.status(200).message('success').return({ "status": "OK" });
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const resetPassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		return res.status(200).message('success').return({ "status": "OK" });
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

module.exports = {
	login, 
	signup,
	updatePassword,
	resetPassword
};
