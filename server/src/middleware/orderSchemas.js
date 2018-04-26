import Joi from 'joi';

const modifyOrder = Joi.object({
  userId: Joi.number().integer(),
  menuId: Joi.number().integer(),
  mealId: Joi.number().integer(),
});

const params = Joi.object({
  id: Joi.number().integer()
});

export default {
  modifyOrder,
  createOrder: modifyOrder.options({
    presence: 'required'
  }),
  params
};