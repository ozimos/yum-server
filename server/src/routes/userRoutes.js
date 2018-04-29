import express from 'express';
import Validator from 'express-joi-validation';

import UserController from '../controllers/controller';
import schemas from '../middleware/userSchemas';
import users from '../models/users';

const router = express.Router();
const validator = Validator({});
const userController = new UserController(users);

router.post(
  '/', validator.body(schemas.postUsers),
  UserController.select(userController, 'signUp')
);

router.post('/login', validator.body(schemas.login), UserController.select(userController, 'login'));

// Return router
export default router;