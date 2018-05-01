import Joi from 'joi';

const login = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string().required()
});
const signup = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.ref('confirmPassword'),
  confirmPassword: Joi.string()
    .strip()
    .required(),
  isCaterer: Joi.boolean()
});

export default {
  signup,
  login
};
