// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import Controller from '../controllers/controller.js';
import schemas from '../middleware/mealSchemas.js';
import meals from '../models/meals.js';

const router = express.Router();
const validator = Validator({});
const controller = new Controller(meals);


// Params validation
router.param('id', validator.params(schemas.params));

router.route('/')
  .get(controller.getAllRecords())
  .post(validator.body(schemas.createMeal), controller.postRecord());

router.route('/:id')
  .get(controller.getSingleRecord())
  .put(validator.body(schemas.modifyMeal), controller.updateRecord())
  .delete(controller.deleteRecord());


// Return router
export default router;