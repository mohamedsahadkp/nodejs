const Op = require('sequelize').Op;
const Utils = require('../../../helper/util.helper');
const Const = require('../../../helper/constant.helper');

const {
	devicetype: DeviceType,
	alarm: Alarm,
	device: Device,
	room: Room,
	deviceroommapping: DeviceRoomMapping,
	channel: Channel,
	alerts: Alerts,
	accessprotocol: AccessProtocol,
	grocyclestatus: GrocycleStatus,
	grocycle: Grocycle,
	gatewaystatus: GatewayStatus
} = require('../../../helper/db.helper');

const setAlarmQuery = async (deviceId, channelId, userId) => {
	return Device.findOne({
		where : {
			id : {
				[Op.eq] : deviceId
			},
			user_id : {
				[Op.eq] : userId
			},
			is_active : {
				[Op.eq] : 1
			}
		},
		include : {
			model: DeviceType,
			where : {
				type :{
					[Op.ne] : Const.GATEWAY
				}
			},
			include : {
				model : Channel,
				where :{
					id : {
						[Op.eq] : channelId
					}
				}
			}
		}
	});
};

const updateAlarmQuery = async (device, alarm) => {
	return Alarm.update({
		'high_value': alarm.high_value,
		'low_value' : alarm.low_value
	}, {
		where: {
			device_id: {
				[Op.eq]: device.id
			},
			channel_id: {
				[Op.eq]: device.channelId
			}
		}
	});
}

const addDeviceQuery = async (device, userId) => {
	console.log("device :" + JSON.stringify(device));

	return Device.create({
		'name': device.name,
		'description': device.description,
		'serial_number': device.serial_number,
		'devicetype_id': device.devicetype_id,
		'uuid': device.uuid,
		'created_on': Utils.timeNowInMilliSec(),
		'is_active': 1,
		'user_id': userId
	}).then(deviceQueryResult => {
			if(device.devicetype_id == Const.NEST_CHANNEL || device.devicetype_id == Const.PH_METER_CHANNEL) {
				device.channel.map(item => {
					Alarm.create({
						'high_value': item.high_value,
						'low_value': item.low_value,
						'channel_id': item.id,
						'device_id': deviceQueryResult.id,
					});
					Alerts.create({
						'channel_id': item.id,
						'device_id': deviceQueryResult.id,
						'is_resolved': 1,
					});
				});
				AccessProtocol.create({
					'access_identifier_value': device.access_token || 'token',
					'access_identifier': 'token',
					'device_id': deviceQueryResult.id,
				});
			} else if(device.devicetype_id == Const.HUNDER_PRO_CHANNEL) {
				device.channel.map(item => {
					Alarm.create({
						'high_value': item.high_value,
						'low_value': item.low_value,
						'channel_id': item.id,
						'device_id': deviceQueryResult.id,
					});
					Alerts.create({
						'channel_id': item.id,
						'device_id': deviceQueryResult.id,
						'is_resolved': 1,
					});
				});
				AccessProtocol.create({
					'access_identifier_value': device.access_token || 'api_key',
					'access_identifier': 'api_key',
					'device_id': deviceQueryResult.id,
				});
			} else if(device.devicetype_id == Const.GATEWAY_CHANNEL) {
				device.channel.map(item => {
					Alerts.create({
						'device_id': deviceQueryResult.id,
						'is_resolved': 1,
						'channel_id': item.id,
					});
				});
				GatewayStatus.create({
					'device_id': deviceQueryResult.id,
					'ethernet': 0,
					'bluetooth': 0,
					'hotspot': 0
				});
			}
	});
};

const updateDeviceQuery = async (deviceId, device, userId) => {
	return Device.update({
		'name': device.name,
		'description': device.description,
		'serial_number': device.serial_number,
		'devicetype_id': device.devicetype_id,
		'uuid': device.uuid,
	},	{
		where: {
			id: {
				[Op.eq]: deviceId
			},
			user_id: {
				[Op.eq]: userId
			},
			is_active :{
				[Op.eq] : 1
			}
		}
	}).then(deviceQueryResult => {
		if(device.devicetype_id != 4) {
			device.channel.map(item => {
				Alarm.update({
					'high_value': item.high_value,
					'low_value': item.low_value,
				},{
					where: {
						channel_id: {
							[Op.eq]: item.id
						},
						device_id : {
							[Op.eq] : deviceId
						}
					}
				});
			});
			if(device.access_token) {
				AccessProtocol.update({
					'access_identifier_value': device.access_token,
					'access_identifier': 'token',
				}, {
					where : {
						device_id: {
							[Op.eq]: deviceId
						}
					}
				});
			}
		}
	});
};

const deleteDeviceQuery = async (deviceId, userId) => {
	return Device.update({
		'is_active': 0,
	},	{
		where: {
			id: {
				[Op.eq]: deviceId
			},
			user_id: {
				[Op.eq]: userId
			},
			is_active :{
				[Op.eq] : 1
			}
		}
	});
};

const checkDeviceQuery = async (deviceId, userId) => {
	return Device.find({
		where : { 
			id : {
				[Op.eq] : deviceId
			},
			is_active :{
				[Op.eq] : 1
			}, 
			user_id :{
				[Op.eq] : userId
			}
		}, 
		include : {
			model : DeviceRoomMapping,
			where : {
				device_id : {
					[Op.eq] : deviceId
				}
			},
			required: false
		}
	});
} 

const getDeviceListQuery = async (deviceTypeId, userId) => {
	return Device.findAll({
		attributes: ['id', 'name', 'description', 'devicetype_id', 'serial_number'],
		where: {
			is_active: {
				[Op.eq]: 1
			},
			devicetype_id:	{
				[Op.eq]: deviceTypeId
			},
			user_id : {
				[Op.eq] : userId
			}
		},
		include : {
			model: Alerts,
			attributes: ['is_connected']
		}
	});
};

const getFullDeviceListQuery = async (userId) => {
	return Device.findAll({
		attributes: ['id', 'name', 'description', 'devicetype_id', 'serial_number'],
		where: {
			is_active: {
				[Op.eq]: 1
			},
			user_id:{
				[Op.eq]: userId
			}
		},
		include : {
			model: DeviceRoomMapping,
		}
	});
};

const getDeviceWithChannelQuery = async (deviceId, userId) => {
	return Device.find({
		attributes: ['id', 'name', 'description', 'devicetype_id', 'serial_number', 'uuid'],
		where: {
			id:	{
				[Op.eq]: deviceId
			},
			user_id: {
				[Op.eq]: userId
			},
			is_active: {
				[Op.eq]: 1
			},
		},
		include: [{
			model: Alarm,
			include: {
				model: Channel,
			}
		}, {
			model: AccessProtocol
		}]
	});
};

const getRoomInfomationQuery = async (deviceId, userId) => {
	return Device.find({
		where :{
			id : {
				[Op.eq]	: deviceId
			},
			is_active : {
				[Op.eq] : 1
			},
			user_id : {
				[Op.eq] : userId
			}
		},
		include : {
			model:  DeviceRoomMapping,
			include : {
				model: Room,
				attributes: ['id','room_name'],
				where: {
					user_id: {
						[Op.eq]: userId
					},
					is_active: {
						[Op.eq]: 1
					}
				}
			}
		},
		required: false
	});
}

const checkSerialNumberQuery = async (device, userId) => {
	return Device.find({
		where: {
			serial_number: {
				[Op.eq]: device.serial_number
			}
		}
	});
};

const checkUUIDQuery = async (device, userId) => {
	return Device.find({
		where: {
			uuid: {
				[Op.eq]: device.uuid
			}
		}
	});
};

const validateDeviceQuery = async (DType, deviceId, userId) => {
	return Device.find({
		attributes: ['id', 'uuid', 'devicetype_id'],
		where: {
			id:	{
				[Op.eq]: deviceId
			},
			is_active: {
				[Op.eq]: 1
			},
			user_id: {
				[Op.eq]: userId
			},
		},
		include : [{
			model: DeviceType,
			where: {
				type: {
					[Op.eq]: DType
				}
			}
		}, {
			model: AccessProtocol
		}]
	});
}

const updateGrocycleForHunderPro = async (deviceId, userId) => {
	DeviceRoomMapping.find({
		include: [{
			model: Room,
			where : {
				user_id : {
					[Op.eq] : userId
				},
				is_active : {
					[Op.eq] : 1
				}
			},
			include: {
				model: GrocycleStatus
			}
		},	{
			model: Device,
			where : {
				id : {
					[Op.eq] : deviceId
				},
				user_id : {
					[Op.eq] : userId
				},
				is_active : {
					[Op.eq] : 1
				}
			},
			include : {
				model: DeviceType,
				include : {
					model: Channel					
				}
			}
		}]
	}).then(room => {
		Grocycle.update({
			'is_changed': 1,
			'is_active_oncemore': 1
		},	{
			where: {
				room_id: {
					[Op.eq]: room.room.id
				},
				day: {
					[Op.eq]: room.room.grocyclestatus.current_day
				},
				device_id :{
					[Op.eq] : room.device.id
				},
				channel_id :{
					[Op.eq] : room.device.devicetype.channels[0].id
				}
			}
		});
	});
};
	
module.exports = {
	setAlarmQuery,
	addDeviceQuery,
	updateDeviceQuery,
	deleteDeviceQuery,
	checkDeviceQuery,

	getRoomInfomationQuery,
	getDeviceListQuery,
	getDeviceWithChannelQuery,
	
	checkSerialNumberQuery,
	checkUUIDQuery,
	validateDeviceQuery,
	updateGrocycleForHunderPro,
	
	updateAlarmQuery,
	getFullDeviceListQuery
};