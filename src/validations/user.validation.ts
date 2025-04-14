import Joi from 'joi';
import constants from '../config/constants.config'; 
const { STATUS }  = constants;
const { ENABLED, DISABLED, DELETED } = STATUS;

export default {
    userAddReq: {
        headers: Joi.object().keys({
			authorization: Joi.string().trim().required()
		}).options({ allowUnknown: true }),
        body: Joi.object().keys({
            username: Joi.string().trim().required().min(2).max(15),
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().min(6).required().min(6),
            mobileNumber: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required().messages({
                'string.mobileNumber': 'Mobile number is not allowed to be empty'
            }),
            status: Joi.string().trim().valid(ENABLED, DISABLED).required(),
        })
    },
    userUpdateReq: {
        headers: Joi.object().keys({
			authorization: Joi.string().trim().required()
		}).options({ allowUnknown: true }),
        params: Joi.object().keys({
            id: Joi.string().trim().required()
        }),
        body: Joi.object().keys({
            username: Joi.string().trim().required().min(2).max(15),
            email: Joi.string().trim().email().required(),
            mobileNumber: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required().messages({
                'string.mobileNumber': 'Mobile number is not allowed to be empty'
            }),
            status: Joi.string().trim().valid(ENABLED, DISABLED).required(),
        })
    },
    RegisterReq: {
		headers: Joi.object().keys({
			authorization: Joi.string().trim().required()
		}).options({ allowUnknown: true }),
		body: Joi.object().keys({
			username: Joi.string().trim().required().min(2).max(15),
			email: Joi.string().trim().email().required(),
			password: Joi.string().trim().min(6).required().min(6),
			mobileNumber: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required().messages({
				'string.mobileNumber': 'Mobile number is not allowed to be empty'
			})
		})
	},
    userProfileReq: {
        headers: Joi.object().keys({
			authorization: Joi.string().trim().required()
		}).options({ allowUnknown: true }),
        body: Joi.object().keys({
            username: Joi.string().trim().required().min(2).max(15),
            email: Joi.string().trim().email().required(),
            mobileNumber: Joi.string().trim().pattern(/^[6-9]\d{9}$/).required().messages({
                'string.mobileNumber': 'Mobile number is not allowed to be empty'
            }),
            status: Joi.string().trim().valid(ENABLED, DISABLED).required(),
        })
    },
};
