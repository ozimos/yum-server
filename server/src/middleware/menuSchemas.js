import Joi from 'joi';

const menu = Joi.object({
  description: Joi.string(),
  meals: Joi.array().items(Joi.string().guid({
    version: [
      'uuidv4'
    ]
  })).required(),
});

export default menu;