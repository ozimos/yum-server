/* eslint import/no-extraneous-dependencies: off */

import {
  expect
} from 'chai';
import td from 'testdouble';
import UserController from '../../../src/controllers/UserController.js';

let User, userController;
const req = {
  body: {
    email: 'some email',
    password: 'some password',
  }
};
const input = {
  where: {
    email: req.body.email
  },
};

describe('User Controllers', () => {
  beforeEach('Stub User model', () => {
    User = td.object();
    userController = new UserController(User);
  });
  afterEach('Remove stubbing', () => td.reset());
  describe('login(req)', () => {
    it('should return an error message if no data in database', () => {
      const expectedResponse = 'Account does not exist! Visit /api/v1/users/signup and register.';

      td.when(User.findOne(input)).thenResolve(null);
      return userController.login(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });
    it('should return an error message if password is incorrect', () => {
      const response = {
        password: 'some Hash'
      };
      const expectedResponse = 'Incorrect password';
      const bcrypt = {
        compareSync: td.func()
      };

      td.when(User.findOne(input)).thenResolve(response);
      td.when(bcrypt.compareSync(req.body.password, response.password)).thenResolve(false);
      return userController.login(req)
        .then(response2 => expect(response2.message).to.equal(expectedResponse));
    });
    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };

      td.when(User.findOne(input)).thenReject(error);
      return userController.login(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('signUp(req)', () => {
    it('should return an error message if email already in database', () => {
      const expectedResponse = 'Email is not available';
      const dummyUser = {
        email: req.body.email,
      };
      td.when(User.findOrCreate(td.matchers.anything())).thenResolve([dummyUser, false]);
      return userController.signUp(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });

    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };

      td.when(User.findOrCreate(td.matchers.anything())).thenReject(error);
      return userController.signUp(req)
        .catch(response => expect(response.message).to.equal(error.message));
    });
  });

  describe('sendResponseWithToken(data)', () => {
    const data = {
      password: 'abc123',
      isCaterer: true,
      id: 'some id'
    };
    const inputMessage = 'Signup Successful, ';
    it('should create a token', () => {

      const response = UserController.sendResponseWithToken(data, inputMessage);

      expect(response.message).to.equal('Signup Successful, Login Successful');
      expect(response.statusCode).to.equal(200);
      // eslint-disable-next-line
      expect(response.token).to.exist;
    });
    it('should not return the password in the response', () => {

      const strippedData = { ...data
      };
      delete strippedData.password;

      const response = UserController.sendResponseWithToken(data, inputMessage);

      expect(response.data).to.eql(strippedData);
    });
  });
});