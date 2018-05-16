/* eslint import/no-extraneous-dependencies: off */
import chai from 'chai';

import UserController from '../../../../src/controllers/UserController';
import {
  seedUsers
} from '../../../../src/seedFiles';
import db from '../../../../src/models';

export const { expect } = chai;
export const defaultUser = seedUsers[0];
export const defaultPassword = 'test';
export const userController = new UserController(db.User);