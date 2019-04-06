/*******************************************************************
 * Database helper file
 * This helper file used to load models genarated by sequelize-auto
 * Also the relation between models were defind in this file
 * 
 * Author: 
 * Created On: 
 ********************************************************************/

const fs = require('fs');
const connection = require('../db/sequelize.mysql');

let DB = {};

// Loading models - Generated using sequelize-auto
fs.readdirSync(`${__dirname}/../models`)
	.filter((file) => file.indexOf('.') !== 0)
	.forEach((file) => {
		let model = connection.import(`${__dirname}/../models/${file}`);
		DB[model.name] = model;
	});

/*****************************************
 * Specify relations between tables below
 *****************************************/
//device --> devicetype <-- channel
// DB.device.belongsTo(DB.devicetype, { foreignKey: 'devicetype_id' });
// DB.channel.belongsTo(DB.devicetype, { foreignKey: 'devicetype_id' });

// DB.devicetype.hasOne(DB.device, { foreignKey: 'devicetype_id' });
// DB.devicetype.hasMany(DB.channel, { foreignKey: 'devicetype_id' });

// // Room --> Operationdown
// DB.operationdown.belongsTo(DB.room, { foreignKey: 'room_id' });
// DB.room.hasMany(DB.operationdown, { foreignKey: 'room_id' });

// //Room --> GrowcycleStatus
// DB.grocyclestatus.belongsTo(DB.room, { foreignKey: 'room_id' });
// DB.room.hasOne(DB.grocyclestatus, { foreignKey: 'room_id' });

// Export connection object
DB.connection = connection;
module.exports = DB;