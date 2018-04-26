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
  .get(Controller.select(controller, 'getAllRecords'))
  .post(validator.body(schemas.createMeal), Controller.select(controller, 'postRecord'));

router.route('/:id')
  .get(Controller.select(controller, 'getSingleRecord'))
  .put(validator.body(schemas.modifyMeal), Controller.select(controller, 'updateRecord'))
  .delete(Controller.select(controller, 'deleteRecord'));


// Return router
export default router;