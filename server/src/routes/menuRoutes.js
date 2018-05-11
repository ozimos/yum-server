// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import MenuController from '../controllers/menuController';
import menuSchema from '../middleware/menuSchemas';
import IsUser from '../middleware/authenticate';
import db from '../models';

const router = express.Router();
const validator = Validator({ passError: true });
const menuController = new MenuController(db.Menu, db.Meal);


router.route('/')
  .get(IsUser.verify, MenuController.select(menuController, 'getMenu'))
  .post(IsUser.verify, IsUser.admin, validator.body(menuSchema), MenuController.select(menuController, 'postMenu'));

// Return router
export default router;