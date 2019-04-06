const { query, param, body } = require('express-validator/check');

const tempOption = ['F', 'C'];

const updateDeviceValidation = [
	param('id')
		.exists().withMessage('Required.')
		.isInt().withMessage('Value must be an integer.'),
	body('name')
		.exists().withMessage('Required.'),		
	body('description')
		.exists().withMessage('Required.'),
	body('devicetype_id')
		.exists().withMessage('Required.')
		.isInt().withMessage('Value must be an integer.'),
];

const addDeviceValidation = [
	body('name')
		.exists().withMessage('Required.'),		
	body('description')
		.exists().withMessage('Required.'),
	body('serial_number')
		.exists().withMessage('Required.'),
	body('uuid')
		.exists().withMessage('Required.'),
	body('devicetype_id')
		.exists().withMessage('Required.')
		.isInt().withMessage('Value must be an integer.'),
];

const setAlarmValidation = [
	body('high_value')
		.exists().withMessage('Required.')
		.isInt().withMessage('Value must be an integer.'),		
	body('low_value')
		.exists().withMessage('Required.')
		.isInt().withMessage('Value must be an integer.'),
];

const getNestDeviceListValidation = [
	query('api_key')
		.exists().withMessage('Required.')
];

const getHunderProDeviceListValidation = [
	query('api_key')
		.exists().withMessage('Required.')
];

const setTempInNestValidation = [
	body('temperature')
		.isInt().withMessage('Value must be an integer.')
		.exists().withMessage('Required.'),
		
	body('temperature_scale')
		.isIn(tempOption)
		.exists().withMessage('Required.')
];

const addOneMoreInHunderProValidation = [
];

module.exports = {
	addDeviceValidation,
	updateDeviceValidation,
	setAlarmValidation,

	getNestDeviceListValidation,
	getHunderProDeviceListValidation,

	setTempInNestValidation,
	addOneMoreInHunderProValidation,
};