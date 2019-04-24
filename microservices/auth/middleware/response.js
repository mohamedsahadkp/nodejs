
/** APP RESPONSE MIDDLEWARE  **/

const _ = require('lodash');
const status = require('./../config/http.status.json');
const I18n = require('../helper/i18n.helper');

const response = (req, res, next) => {
	const lang = _.trim(req.headers['x-app-language']) || 'en';
	
	// Check for laguage support
	if (_.indexOf(I18n.languageList, lang) === -1) {
		req.language = 'en';
		// const notAccepted = 406;
		// return res.status(notAccepted).send({ message: status[notAccepted], status: notAccepted });
	} else {
		req.language = lang;
	}

	// New function to response object - send custom messages in response
	res.message = (message, data = {}) => {
		if (typeof message === 'string') {
			res.responseMessage = I18n.text(message, lang, data);
		}
		return res;
	};

	// New function to response object - replacement for send function, used to format api response
	res.return = (data) => {
		const message = res.responseMessage || status[res.statusCode];
		res.send({ message, status: res.statusCode, data });
	};

	// Error handler function
	res.errorHandler = (err = '') => {
		const error = process.env.NODE_ENV !== 'production' ? err : undefined;

		if (err.message && err.message === 'EACCES') {
			return res.status(401).send({ message: status[401], status: res.statusCode });
		}

		return res.status(500).send({ message: status[500], status: res.statusCode, error });
	};

	next();
};

module.exports = { response };
