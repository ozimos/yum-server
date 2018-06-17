// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import OrderController from '../controllers/OrderController';
import params from '../middleware/paramSchema';
import orderSchema from '../middleware/orderSchemas';
import Authenticate from '../middleware/Authenticate';
import db from '../models';

const orderRouter = express.Router();
const validator = Validator({ passError: true });
const orderController = new OrderController(db.Order, db.Meal);

// Params validation
orderRouter.param('id', validator.params(params));

orderRouter
  .route('/')
  .get(Authenticate.isUser, Authenticate.isAdmin, OrderController.select(orderController, 'getAllOrders'))
  .post(Authenticate.isUser, validator.body(orderSchema), OrderController.orderClose, OrderController.select(orderController, 'postOrder'));

orderRouter
  .route('/:id')
  .put(Authenticate.isUser, validator.body(orderSchema), OrderController.orderClose, OrderController.select(orderController, 'updateOrder'));

orderRouter
  .route('/date/:date?')
  .get(Authenticate.isUser, Authenticate.isAdmin, validator.body(orderSchema), OrderController.select(orderController, 'getUserOrdersByDate'));

orderRouter
  .route('/user')
  .get(Authenticate.isUser, validator.body(orderSchema), OrderController.select(orderController, 'getUserOrders'));

// Return orderRouter
export default orderRouter;