import express from 'express';
import Validator from 'express-joi-validation';

import UserController from '../controllers/userController';
import schemas from '../middleware/userSchemas';
import db from '../models';

const router = express.Router();
const validator = Validator({});
const userController = new UserController(db.User);

router.post(
  '/signup', validator.body(schemas.signup),
  UserController.select(userController, 'signUp')
);

router.post('/login', validator.body(schemas.login), UserController.select(userController, 'login'));

// Return router
export default router;