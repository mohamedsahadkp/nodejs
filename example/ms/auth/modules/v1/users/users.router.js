const router = require('express').Router();
const { 
	getDevice,
	addDevice,
	updateDevice,
	deleteDevice,
	getFullDeviceList
} = require('./device.service');

const { 
	addDeviceValidation,
	updateDeviceValidation,
} = require('./device.validation');

var routes = (authenticate) => {

	router.route('/')
		.post(authenticate, addDeviceValidation, addDevice);
	
	router.route('/')
		.get(authenticate, getFullDeviceList);

	router.route('/:id')
		.get(authenticate, getDevice)
		.put(authenticate, updateDeviceValidation, updateDevice)
		.delete(authenticate, deleteDevice);

	return router;
};
module.exports = { routes, path: 'device' };
