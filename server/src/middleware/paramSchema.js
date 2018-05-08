import Joi from 'joi';

const params = Joi.object({
  id: Joi.string().guid({
    version: [
      'uuidv4'
    ]
  })
});

export default params;