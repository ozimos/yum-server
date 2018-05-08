import Joi from 'joi';

const order = Joi.object({
  meals: Joi.array().items(Joi.string().guid({
    version: [
      'uuidv4'
    ]
  })).required(),
});

export default order;