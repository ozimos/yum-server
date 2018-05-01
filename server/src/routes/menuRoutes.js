// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import MenuController from '../controllers/menuController';
import menuSchema from '../middleware/menuSchemas';
import menus from '../models/menus';

const router = express.Router();
const validator = Validator({});
const menuController = new MenuController(menus);


router.route('/')
  .get(MenuController.select(menuController, 'getMenu'))
  .post(validator.body(menuSchema), MenuController.select(menuController, 'postMenu'));

// Return router
export default router;