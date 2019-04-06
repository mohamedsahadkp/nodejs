const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const Const = require('./constant.helper');

/******************************
 * General utility functions
 * Author: 
 * Created On: 
 *****************************/
module.exports.generateJwtToken = async (data) => {
	// Token will be expired in 60 hrs
	//return jwt.sign(data, 'fUfxjOWDUbIAFCmd2ox0joxlOQZPPpQi8PCXrgAoXymGZZTnNUXU', { expiresIn: 60 * 60 * 60 }).toString();
	return jwt.sign(data, 'fUfxjOWDUbIAFCmd2ox0joxlOQZPPpQi8PCXrgAoXymGZZTnNUXU').toString();
};

// Function to encrypt password
module.exports.encryptPassword = async (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

module.exports.timeNowInMilliSec = () => {
	return new Date().getTime();
}

module.exports.roomPauseTimeMilliSec = async (pauseTime) => {
	let twentyMinutesLater = new Date();
	return twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + pauseTime);
}
