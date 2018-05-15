import Joi from 'joi';

const paramSchema = Joi.object({
  id: Joi.string().guid({
    version: [
      'uuidv4'
    ]
  })
});

export default paramSchema;