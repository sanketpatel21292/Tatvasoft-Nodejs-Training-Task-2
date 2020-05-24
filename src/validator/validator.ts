import Joi from 'joi';

export const userSchema = Joi.object().keys({
    name: Joi.string()
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .max(50)
        .required(),

    phone: Joi.string()
        .max(50)
        .required(),

    roleIds: Joi.array().required(),

    teamIds: Joi.array().required()
});

export const roleSchema = Joi.object().keys({
    name: Joi.string()
        .max(50)
        .required(),

    createdBy: Joi.number().integer(),

    modifiedBy: Joi.number().integer()
});

export const teamSchema = Joi.object().keys({
    name: Joi.string()
        .max(50)
        .required(),

    createdBy: Joi.number().integer(),

    modifiedBy: Joi.number().integer()
});

export const searchRoleTeamSchema = Joi.object().keys({
    name: Joi.string().max(50).required(),

    limit: Joi.number().integer().required(),

    offset: Joi.number().integer().required()
});