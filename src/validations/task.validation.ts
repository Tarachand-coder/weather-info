import * as Joi from 'joi';

export default {
    taskAddReq: {
        body: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            expireIn: Joi.date().iso().required()
        })
    },

    taskUpdateReq: {
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