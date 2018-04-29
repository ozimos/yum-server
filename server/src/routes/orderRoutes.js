// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import Controller from '../controllers/controller';
import schemas from '../middleware/orderSchemas';
import orders from '../models/orders';

const router = express.Router();
const validator = Validator({});
const controller = new Controller(orders);

// Params validation
router.param('id', validator.params(schemas.params));

router
  .route('/')
  .get(Controller.select(controller, 'getAllRecords'))
  .post(
    validator.body(schemas.createOrder),
    Controller.select(controller, 'postRecord')
  );

router
  .route('/:id')
  .get(Controller.select(controller, 'getSingleRecord'))
  .put(
    validator.body(schemas.modifyOrder),
    Controller.select(controller, 'updateRecord')
  )
  .delete(Controller.select(controller, 'deleteRecord'));

// Return router
export default router;
