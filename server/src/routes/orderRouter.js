import express from 'express';
import Validator from 'express-joi-validation';

import OrderController from '../controllers/OrderController';
import orderSchema from '../middleware/orderSchemas';
import params from '../middleware/paramSchema';
import query from '../middleware/querySchema';
import Authenticate from '../middleware/Authenticate';
import db from '../models';

const orderRouter = express.Router();
const validator = Validator({ passError: true });
const orderController = new OrderController(db.Order, db.Meal);

orderRouter
  .route('/')
  .get(
    Authenticate.isUser, validator.query(query),
    OrderController.select(orderController, 'getOrdersWithMealLinks')
  )
  .post(
    Authenticate.isUser, validator.query(query),
    validator.body(orderSchema),
    OrderController.orderClose,
    OrderController.select(orderController, 'postOrder')
  );
orderRouter
  .route('/:id')
  .put(
    Authenticate.isUser, validator.params(params), validator.query(query),
    validator.body(orderSchema),
    OrderController.orderClose,
    OrderController.select(orderController, 'updateOrder')
  );
orderRouter
  .route('/:id/meals')
  .get(
    Authenticate.isUser, validator.params(params), validator.query(query),
    OrderController.select(orderController, 'getMealsInOrder')
  );
orderRouter
  .route('/date/:date?')
  .get(
    Authenticate.isUser, validator.params(params), validator.query(query),
    OrderController.select(orderController, 'getOrdersWithMealLinksByDate')
  );

export default orderRouter;
