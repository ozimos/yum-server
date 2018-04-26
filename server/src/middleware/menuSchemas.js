import Joi from 'joi';

const menu = Joi.object({
  date: Joi.date().min('now').required(),
  description: Joi.string().required(),
  meals: Joi.array().items(Joi.object().required()).required(),
});

export default menu;