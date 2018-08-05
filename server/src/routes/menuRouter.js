// Dependencies
import express from 'express';
import Validator from 'express-joi-validation';

import MenuController from '../controllers/MenuController';
import menuSchema from '../middleware/menuSchemas';
import Authenticate from '../middleware/Authenticate';
import db from '../models';

const menuRouter = express.Router();
const validator = Validator({ passError: true });
const menuController = new MenuController(db.Menu, db.Meal);


menuRouter.route('/')
  .get(Authenticate.isUser, MenuController.select(menuController, 'getMenu'))
  .post(
    Authenticate.isUser,
    Authenticate.isAdmin,
    validator.body(menuSchema),
    MenuController.select(menuController, 'postMenu')
  );

// Return menuRouter
export default menuRouter;
