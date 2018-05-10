// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import OrderController from '../controllers/orderController';
import params from '../middleware/paramSchema';
import orderSchema from '../middleware/orderSchemas';
import IsUser from '../middleware/authenticate';
import db from '../models';

const router = express.Router();
const validator = Validator({});
const orderController = new OrderController(db.Order, db.Meal);

// Params validation
router.param('id', validator.params(params));

router
  .route('/')
  .get(IsUser.verify, IsUser.admin, OrderController.select(orderController, 'getAllOrders'))
  .post(IsUser.verify, validator.body(orderSchema), OrderController.orderClose, OrderController.select(orderController, 'postOrder'));

router
  .route('/:id')
  .put(IsUser.verify, IsUser.admin, validator.body(orderSchema), OrderController.orderClose, OrderController.select(orderController, 'updateOrder'));

// Return router
export default router;