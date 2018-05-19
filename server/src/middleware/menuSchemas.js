import Joi from 'joi';

const menuSchemas = Joi.object({
  description: Joi.string().trim().min(1).max(256)
    .truncate(),
  meals: Joi.array().items(Joi.string().guid({
    version: [
      'uuidv4'
    ]
  })).required(),
});

export default menuSchemas;