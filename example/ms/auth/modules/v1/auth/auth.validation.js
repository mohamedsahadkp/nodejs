const { body } = require('express-validator/check');

const signupValidation = [
	body('email')
		.exists().withMessage('Required')
		.isEmail().withMessage('Should be a valid email address'),

	body('password')
		.exists().withMessage('Required')
		.isLength(5).withMessage('Password should have 5 charactors'),

	body('mobile')
		.exists().withMessage('Mobile required'),

	body('name')
		.exists().withMessage('Name required')
];

const loginValidation = [
	body('email')
		.exists().withMessage('Email required')
		.isEmail().withMessage('Should be a valid email address'),

	body('password')
		.exists().withMessage('Password required')
		.isLength(5).withMessage('Password should have 5 charactors'),
];

module.exports = {
	loginValidation,
	signupValidation
};