// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import MenuController from '../controllers/menuController.js';
import schemas from '../middleware/menuSchemas.js';
import menus from '../models/menus.js';

const router = express.Router();
const validator = Validator({});
const menuController = new MenuController(menus);


router.route('/')
  .get(MenuController.select(menuController, 'getTodaysMenu'))
  .post(validator.body(schemas.menu), MenuController.select(menuController, 'postRecord'));

// Return router
export default router;