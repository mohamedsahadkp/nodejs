import { pick } from 'lodash';
import { compareSync } from 'bcryptjs';
import { encryptPassword, generateJwtToken } from '../../../helper/util.helper';
import { validationResult } from 'express-validator/check';

import { 
	updatePasswordQuery, 
	addUserQuery, 
	findUserByEmailQuery 
} from './auth.query';

const signup = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}
	
	try {
		const params = pick(req.body, ['email', 'mobile', 'password', 'name' ]);
		const user = await findUserByEmailQuery(params.email);
		if (user) {
			return res.status(409).message('account-exists').return();
		}
	
		const password = await encryptPassword(params.password);		
		const newuser = await addUserQuery(params, password);
		const newuser = await addUserInformationQuery(params, password);
		return res.status(200).message('success').return(newuser);
	} catch(e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		const user = await findUserByEmailQuery(req.body.email);
		if (!user) {
			return res.status(400).message('user-invalid-credentials').return();
		} else {
			if (user.is_active == 1 && user.is_deleted == 0) {
				let passwordMatch = compareSync(req.body.password, user.user_password);
				
				if (!passwordMatch) {
					return res.status(401).message('user-invalid-credentials').return();
				}
				const response = {
					id: parseInt(user.id),
					name: user.user_name,
					image: null,
					email: user.user_email.toLowerCase(),
					authToken: await generateJwtToken({ id: user.id })
				};
				return res.status(200).message('success').return(response);
			} else {
				return res.status(400).message('user-invalid-credentials').return();
			}
		}
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const updatePassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		// Feature is not required 

		// const user = await findUserByEmailQuery(req.body.email);
		// if (!user) {
		// 	res.status(400).message('invalid-account').return();
		// }
		
		// const password = await Utils.encryptPassword(req.body.password);
		// const response = await updatePasswordQuery(user.id, password);
		// res.status(200).message('success').return(response);
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

const resetPassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(406).message('not-acceptable').return(errors.mapped());
	}

	try {
		// Feature is not required 

		// const user = await findUserByEmailQuery(req.body.email);
		// if (!user) {
		// 	res.status(400).message('invalid-account').return();
		// }
		
		// const password = await Utils.encryptPassword(req.body.password);
		// const response = await updatePasswordQuery(user.id, password);
		// res.status(200).message('success').return(response);
	} catch (e) {
		console.log(e);
		return res.errorHandler(e);
	}
};

modeule.export = {
	login, 
	signup,
	updatePassword,
	resetPassword
};
