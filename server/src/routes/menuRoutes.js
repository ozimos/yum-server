// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import MenuController from '../controllers/menuController';
import menuSchema from '../middleware/menuSchemas';
import menus from '../models/menus';
import meals from '../models/meals';

const router = express.Router();
const validator = Validator({});
const menuController = new MenuController(menus, meals);


router.route('/')
  .get(MenuController.select(menuController, 'getTodaysMenu'))
  .post(validator.body(menuSchema), MenuController.select(menuController, 'postRecord'));

// Return router
export default router;