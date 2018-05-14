import Joi from 'joi';

const menuSchemas = Joi.object({
  description: Joi.string(),
  meals: Joi.array().items(Joi.string().guid({
    version: [
      'uuidv4'
    ]
  })).required(),
});

export default menuSchemas;