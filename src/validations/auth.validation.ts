import * as Joi from 'joi';
import constants from '../config/constants.config'; 
const { STATUS }  = constants;
const { ENABLED, DISABLED, DELETED } = STATUS;

export default {
	deviceRegisterReq: {
        headers: Joi.object().keys({
			authorization: Joi.string().trim().required()
		}).options({ allowUnknown: true }),
		body: Joi.object().keys({
			deviceId: Joi.string().trim().required()
		}).options({ allowUnknown: true })
	},
	loginReq: {
		headers: Joi.object().keys({
			authorization: Joi.string().trim().required()
		}).options({ allowUnknown: true }),
		body: Joi.object().keys({
			email: Joi.string().trim().required(),
			password: Joi.string().trim().required()
		}).options({ allowUnknown: true })
	},
	refreshTokenReq: {
		headers: Joi.object().keys({
			authorization: Joi.string().trim().required()
		}).options({ allowUnknown: true }),
		body: Joi.object().keys({
			accessToken: Joi.string().trim().required(),
			refreshToken: Joi.string().trim().required(),
		}).options({ allowUnknown: true })
	}
}