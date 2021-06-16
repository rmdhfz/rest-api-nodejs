const Joi = require('@hapi/joi'),
        JoiID = require('joi-oid');


const validationRegister = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).trim().required(),
        email: Joi.string().min(4).trim().required().email(),
        password: Joi.string().min(6).trim().required()
    })
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const validationID = (data) => {
    const schema = JoiID.object({
        id: JoiID.objectId(),
    })
    return schema.validate(data);
}

module.exports.validationRegister = validationRegister;
module.exports.loginValidation = loginValidation;
module.exports.validationID = validationID;