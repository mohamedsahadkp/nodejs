const Op = require('sequelize').Op;
const { users: Users } = require('../../../helper/db.helper');

const findUserByEmailQuery = async (email) => {
	return Users.find({
		where: {
			user_email: {
				[Op.eq]: email.toLowerCase()
			}
		}
	});
};

const updatePasswordQuery = async (userId, password) => {
	return Users.update({
			user_password: password
		}, {
			where: {
				id: {
					[Op.eq]: userId
				}
			}
		}
	);
};

const addUserQuery = async (user, password) => {
	return Users.create({
		user_name: user.name,
		user_email: user.email.toLowerCase(),
		user_password: password,
		user_mobile_no: user.mobile,
		created_time: new Date().getTime(),
		is_active: true,
		is_deleted: false
	});
};

module.exports = { 
	updatePasswordQuery, 
	addUserQuery, 
	findUserByEmailQuery	
};
