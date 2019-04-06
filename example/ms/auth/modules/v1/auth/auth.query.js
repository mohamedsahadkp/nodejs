import { Op } from 'sequelize';
import { users as Users } from '../../../helper/db.helper';

const findUserByEmailQuery = async (email) => {
	return Users.find({
		where: {
			username: {
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
		user_email: user.email.toLowerCase(),
		user_password: password,
		is_active: true,
	});
};

const addUserInformationQuery = async (user, password) => {
	return Users.create({
		name: user.name,
		email: user.email.toLowerCase(),
		mobile: user.mobile,
		created_time: new Date().getTime(),
		is_active: true,
		is_deleted: false
	});
};

export default { 
	updatePasswordQuery, 
	addUserQuery,
	addUserInformationQuery,
	findUserByEmailQuery	
};
