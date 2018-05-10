// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import Controller from '../controllers/controller';
import params from '../middleware/paramSchema';
import schemas from '../middleware/mealSchemas';
import IsUser from '../middleware/authenticate';
import db from '../models';

const router = express.Router();
const validator = Validator({ passError: true });
const controller = new Controller(db.Meal);


// Params validation
router.param('id', validator.params(params));

router.route('/')
  .get(IsUser.verify, IsUser.admin, Controller.select(controller, 'getAllRecords'))
  .post(IsUser.verify, IsUser.admin, validator.body(schemas.createMeal), Controller.select(controller, 'postRecord'));

router.route('/:id')
  .get(IsUser.verify, IsUser.admin, Controller.select(controller, 'getSingleRecord'))
  .put(IsUser.verify, IsUser.admin, validator.body(schemas.modifyMeal), Controller.select(controller, 'updateRecord'))
  .delete(IsUser.verify, IsUser.admin, Controller.select(controller, 'deleteRecord'));


// Return router
export default router;