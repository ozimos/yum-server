// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import Controller from '../controllers/Controller';
import params from '../middleware/paramSchema';
import schemas from '../middleware/mealSchemas';
import Authenticate from '../middleware/Authenticate';
import db from '../models';

const mealRouter = express.Router();
const validator = Validator({ passError: true });
const controller = new Controller(db.Meal);


// Params validation
mealRouter.param('id', validator.params(params));

mealRouter.route('/')
  .get(Authenticate.isUser, Authenticate.isAdmin, Controller.select(controller, 'getAllRecords'))
  .post(Authenticate.isUser, Authenticate.isAdmin, validator.body(schemas.createMeal), Controller.select(controller, 'postRecord'));

mealRouter.route('/:id')
  .get(Authenticate.isUser, Authenticate.isAdmin, Controller.select(controller, 'getSingleRecord'))
  .put(Authenticate.isUser, Authenticate.isAdmin, validator.body(schemas.modifyMeal), Controller.select(controller, 'updateRecord'))
  .delete(Authenticate.isUser, Authenticate.isAdmin, Controller.select(controller, 'deleteRecord'));


// Return mealRouter
export default mealRouter;