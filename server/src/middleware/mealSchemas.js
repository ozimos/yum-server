import Joi from 'joi';

const modifyMeal = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  imageUrl: Joi.string().uri(),
  price: Joi.number(),
});


export default {
  modifyMeal,
  createMeal: modifyMeal.options({
    presence: 'required'
  })
};