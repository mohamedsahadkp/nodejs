const { validationResult } = require('express-validator/check');
var rp = require('request-promise');
const Config = require('./../../../config/config.json');
const Const = require('../../../helper/constant.helper');

const {
	setAlarmQuery,
	addDeviceQuery,
	updateDeviceQuery,
	deleteDeviceQuery,
	checkDeviceQuery,

	getRoomInfomationQuery,
	getDeviceWithChannelQuery,
	getDeviceListQuery,
	checkSerialNumberQuery,
	checkUUIDQuery,

	validateDeviceQuery,
	updateGrocycleForHunderPro,
	
	updateAlarmQuery,
	getFullDeviceListQuery
} = require('./device.query');

const setAlarm = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const response = await setAlarmQuery(req.params.id, req.params.channelId, req.user.id);
		if (response) {
			const alarm = await updateAlarmQuery(req.params, req.body);
			return res.status(200).message('alarm-update').return();
		} else {
			return res.status(401).message('not-authorized').return();
		}
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const addDevice = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const isSerialNumber = await checkSerialNumberQuery(req.body, req.user.id);
		const isUUID = await checkUUIDQuery(req.body, req.user.id);
		if(isSerialNumber) {
			return res.status(409).message('serial-number-exists').return();
		} else if(isUUID) {
			return res.status(409).message('uuid-exists').return();
		} else {
			const device = await addDeviceQuery(req.body, req.user.id);
			return res.status(200).message('device-add').return(device);
		}
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const updateDevice = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		// const isSerialNumber = await checkSerialNumberQuery(req.body, req.user.id);
		// const isUUID = await checkUUIDQuery(req.body, req.user.id);
		// if(isSerialNumber) {
		// 	return res.status(409).message('serial-number-exists').return();
		// } else if(isUUID) {
		// 	return res.status(409).message('uuid-exists').return();
		// } else {
		//}
		const device = await updateDeviceQuery(req.params.id, req.body, req.user.id);
		return res.status(200).message('device-update').return(device);
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const getDevice = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const device = await getDeviceWithChannelQuery(req.params.id, req.user.id);	
		const room = await getRoomInfomationQuery(req.params.id, req.user.id);
		if(device != null) {
			return res.status(200).message('success').return({
				device_id: device.id,
				device_name: device.name,	
				device_description: device.description,	
				serial_number: device.serial_number,
				uuid: device.uuid,
				access_token: (device.accessprotocols.length == 0)? null : device.accessprotocols[0].access_identifier_value,
				room_id: (room == null || room.deviceroommappings.length == 0) ? null : room.deviceroommappings[0].room.id,
				room_name: (room == null || room.deviceroommappings.length == 0) ? null : room.deviceroommappings[0].room.room_name,
				channels : await channelMap(device.alarms)	
			});
		} else {
			return res.status(406).message('not-authorized').return();
		}
	} catch (e) {
		console.log(e)
		return res.errorHandler(e);
	}
};

const channelMap = async (alarmsList) => {
	return alarmsList.map(alarm => {
		return Object.assign({}, {
			channel_id: alarm.channel.id,
			channel_name: alarm.channel.name,
			channel_unit: alarm.channel.unit,
			high_value: parseFloat(alarm.high_value),
			low_value: parseFloat(alarm.low_value),
		});
	});
};

const getFullDeviceList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const device = await getFullDeviceListQuery(req.user.id);
		return res.status(200).message('success').return(await deviceAllList(device));
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const deviceAllList = async (deviceAllMap) => {
	let deviceAllMapList = [];
	for(let i in deviceAllMap) {
		if(deviceAllMap[i].deviceroommappings.length == 0) {
			deviceAllMapList.push({
				device_id: deviceAllMap[i].id,
				device_name: deviceAllMap[i].name,
				device_description: deviceAllMap[i].description,
				devicetype_id: deviceAllMap[i].devicetype_id,
				serial_number: deviceAllMap[i].serial_number,
			})
		}	
	}
	return deviceAllMapList;
}

const getDeviceList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const device = await getDeviceListQuery(req.params.id, req.user.id);
		return res.status(200).message('success').return({
			head : ["ID", "Name", "Serial Number", "Room ID", "Room", "Status"],
			value : await deviceMap(device, req.user.id)
		});
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const deviceMap = async (deviceList, userId)  => {
	let deviceMapList = [];
	for(let i in deviceList) {
		const room = await getRoomInfomationQuery(deviceList[i].id, userId);
	
		deviceMapList.push({
			device_id: deviceList[i].id,
			device_name: deviceList[i].name,	
			serial_number: deviceList[i].serial_number,
			room_id: (room == null || room.deviceroommappings.length == 0) ? null : room.deviceroommappings[0].room.id,
			room_name: (room == null || room.deviceroommappings.length == 0) ? null : room.deviceroommappings[0].room.room_name,
			status: await checkIsConnected(deviceList[i].alerts)
		});
	}
	return deviceMapList;
};

const checkIsConnected = async (alertList) => {
	let sum = 0;
	alertList.map(alert => {
		sum = sum + alert.is_connected; 
	});

	if(alertList.length	== sum) {
		return 'active';
	} else {
		return 'inactive';
	}
};

const deleteDevice = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const isDeviceValid = await checkDeviceQuery(req.params.id, req.user.id);
		
		if(isDeviceValid == null) {
			return res.status(406).message('not-authorized').return();
		} else if (isDeviceValid.deviceroommappings.length == 0) {
			const device = await deleteDeviceQuery(req.params.id, req.user.id);
			return res.status(200).message('device-deleted').return();
		} else {
			return res.status(406).message('device-in-room').return();
		}
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
}

const getNestDeviceList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const nest_auth_responce = await nestAuth(req.query.api_key);
		let auth_responce = JSON.parse(nest_auth_responce);
		
		const nest_device_responce = await nestGetDevice(auth_responce.access_token);
		let device_responce = JSON.parse(nest_device_responce);

		return res.status(200).message('success').return(await nestDeviceMap(auth_responce, device_responce));
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
}

const nestDeviceMap = async (auth_responce, device_responce) => {
	let device_responce_list = device_responce.thermostats;
	let device = [];
	for (let key in device_responce_list) {
		if (device_responce_list.hasOwnProperty(key)) {
		  let device_obj = device_responce_list[key];
		  device.push({
			nest_device_id: device_obj.device_id,
			nest_device_name: device_obj.name
		  });
		}
	}

	return {
		access_identifier_value: auth_responce.access_token,
		nest_device_list : device
	};
}

const nestAuth = async (apiKey) => {
	var options = {
		method: 'POST',
		uri: Config.nest.ACCESS_TOKEN_BASE_URL,
		form: {
			code: apiKey,
			client_id: Config.nest.PRODUCT_ID,
			client_secret: Config.nest.PRODUCT_SECRET,
			grant_type:'authorization_code',
		}
	};
	return rp(options);
};

const nestGetDevice = async (accessToken) => {
	var options = {
		method: 'GET',
		url: Config.nest.DEVICE_BASE_URL, 
		headers: {
			'Authorization': 'Bearer ' + accessToken,
			'Content-Type': 'application/json'
		}
	};
	return rp(options);
}

const getHunderProDeviceList = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const hunderpro_device_responce = await hunderproDevice(req.query.api_key);
		let device_responce = JSON.parse(hunderpro_device_responce);

		return res.status(200).message('success').return({ 
			access_identifier_value: req.query.api_key, 
			hunderpro_device_list: await hunderproMap(device_responce)
		});
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
}

const hunderproDevice = async (apiKey) => {
	var options = {
		method: 'GET',
		url: Config.hunderpro.DEVICE_BASE_URL + apiKey,
	};
	return rp(options);
}

const hunderproMap = async (device_responce_list) => {
	return device_responce_list.controllers.map(device => {
		return Object.assign({}, {
			hunderpro_device_id: device.controller_id,
			hunderpro_device_name: device.name,
		});
	});
}

const setTempInNest = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const isDeviceValid = await validateDeviceQuery(Const.NEST, req.params.id, req.user.id);
		if(isDeviceValid){
			const isSuccess = await nestSetTempAPI(req.body, isDeviceValid);
			return res.status(200).message('set-nest-temp').return(isSuccess);
		} else {
			res.status(401).message('not-authorized').return();
		}
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const nestSetTempAPI = async (temp, device) => {
	var options = {
		method: 'PUT',
		url: Config.nest.SET_TEMP_URL + device.uuid, 
		headers: {
			'Authorization': 'Bearer ' + device.accessprotocols[0].access_identifier_value,
			'Content-Type': 'application/json',
		},
		body: {
			target_temperature_f: temp.temperature,
			temperature_scale: temp.temperature_scale
		},
		json: true
	};
	return rp(options).catch(err => {
		var newOptions = {
			method: 'PUT',
			url: err.response.headers.location, 
			headers: {
				'Authorization': 'Bearer ' + device.accessprotocols[0].access_identifier_value,
				'Content-Type': 'application/json',
			},
			body: {
				target_temperature_f: temp.temperature,
				temperature_scale: temp.temperature_scale
			},
			json: true
		};
		rp(newOptions);
    });
}

const addOneMoreInHunderPro = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const isDeviceValid = await validateDeviceQuery(Const.HUNDER_PRO, req.params.id, req.user.id);
		if(isDeviceValid){
			const isSuccess = await updateGrocycleForHunderPro(req.params.id, req.user.id);
			return res.status(200).message('set-hunterpro').return(isSuccess);
		} else {
			res.status(401).message('not-authorized').return();
		}
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

module.exports = { 
	setAlarm,
	addDevice,
	updateDevice,
	deleteDevice,
	getDevice,
	getDeviceList,

	getNestDeviceList,
	getHunderProDeviceList,

	setTempInNest,
	addOneMoreInHunderPro,

	getFullDeviceList
};
