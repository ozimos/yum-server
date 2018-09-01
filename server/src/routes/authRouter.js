import express from 'express';
import Validator from 'express-joi-validation';

import UserController from '../controllers/UserController';
import Authenticate from '../middleware/Authenticate';
import schemas from '../middleware/userSchemas';
import params from '../middleware/paramSchema';

import db from '../models';

const authRouter = express.Router();
const validator = Validator({ passError: true });
const userController = new UserController(db.User);

authRouter.post(
  '/signup', validator.body(schemas.signup),
  UserController.select(userController, 'signUp')
);

authRouter.post(
  '/login',
  validator.body(schemas.login),
  UserController.select(userController, 'login')
);
authRouter.get(
  '/user/:id',
  Authenticate.isUser, validator.params(params),
  UserController.select(userController, 'getSingleRecord')
);

// Return authRouter
export default authRouter;
