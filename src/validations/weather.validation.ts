import * as Joi from 'joi';

export default {
    weatherReq: {
        headers: Joi.object().keys({
            authorization: Joi.string().trim().required()
        }).options({ allowUnknown: true }),
        body: Joi.object().keys({
            city: Joi.string().trim().required().min(1),
        }).options({ allowUnknown: true })
    }
}