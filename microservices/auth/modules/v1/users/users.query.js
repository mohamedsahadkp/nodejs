const Op = require('sequelize').Op;
const Utils = require('../../../helper/util.helper');
const Const = require('../../../helper/constant.helper');

const {
} = require('../../../helper/db.helper');

const getUserListQuery = async () => {
	const userList = [{
		"name" : "Experion",
		"address" : "Trivandrum"	
	}, {
		"name" : "Experion 2",
		"address" : "Trivandrum 2"	
	}]
	return userList;
};

	
module.exports = {
	getUserListQuery
};