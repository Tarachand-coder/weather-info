import * as Joi from 'joi';

export default {
    taskAddReq: {
        headers: Joi.object().keys({
            authorization: Joi.string().trim().required()
        }).options({ allowUnknown: true }),
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            expireIn: Joi.date().iso().required()
        })
    },

    taskUpdateReq: {
        headers: Joi.object().keys({
            authorization: Joi.string().trim().required()
        }).options({ allowUnknown: true }),
        params: Joi.object().keys({
            id: Joi.string().trim().required()
        }),
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            expireIn: Joi.date().iso().required()
        })
    }
};