const jwt = require('jsonwebtoken');
const Op = require('sequelize').Op;
const { users: Users } = require('../helper/db.helper');

const authenticate = {
	user: async function (req, res, next) {
		const token = req.header('x-access-key');
		try {
			const decoded = jwt.verify(token,'fUfxjOWDUbIAFCmd2ox0joxlOQZPPpQi8PCXrgAoXymGZZTnNUXU');
			const user = await getUser(decoded);
			if (!user) throw new Error('Un authorized');
      
			req.user = user;
			req.token = token;
			next();
		} catch (err) {
			res.status(401).return();
		}
	},
	// manager: function (options = {}) {
	// 	return async function (req, res, next) {
	// 	};
	// },
	// admin: function (options = {}) {
	// 	return async function (req, res, next) {
	// 	};
	// }
};

const getUser = async(data) => {
	return Users.find({
		where: {
			id: {
				[Op.eq]: data.id
			},
			is_active: {
				[Op.eq]: 1
			},
			is_deleted: {
				[Op.eq]: 0
			}
		}
	});
};

module.exports = {
	authenticate
};
