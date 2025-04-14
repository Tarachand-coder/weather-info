import * as Joi from 'joi';
import constants from '../config/constants.config'; 
const { STATUS }  = constants;

export default {
    blogAddReq: {
        headers: Joi.object().keys({
            authorization: Joi.string().trim().required()
        }).options({ allowUnknown: true }),
        body: Joi.object().keys({
            title: Joi.string().trim().required().min(5).max(15),
            content: Joi.string().trim().required().min(10),
            location: Joi.string().trim().required().min(1),
            status: Joi.string().trim().valid(STATUS.ENABLED, STATUS.DELETED, STATUS.DISABLED)  
        }).options({ allowUnknown: true })
    },

    blogUpdateReq: {
        headers: Joi.object().keys({
            authorization: Joi.string().trim().required()
        }).options({ allowUnknown: true }),
        body: Joi.object().keys({
            title: Joi.string().trim().required().min(5).max(15),
            content: Joi.string().trim().required().min(10),
            location: Joi.string().trim().required().min(1),
            status: Joi.string().trim().valid(STATUS.ENABLED, STATUS.DISABLED)  
        }).options({ allowUnknown: true })
    }
}