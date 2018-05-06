/* eslint import/no-extraneous-dependencies: off */

import {
  expect
} from 'chai';
import td from 'testdouble';
import UserController from '../../../src/controllers/userController.js';

let User;
let userController;
const req = {
  // provide either email or userName
  body: {
    email: 'some email',
    // userName: 'some userName',
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
      const expectedResponse = 'email has been used';
      const dummyUser = {
        email: req.body.email,
      };
      td.when(User.findOne(input)).thenResolve(dummyUser);
      return userController.signUp(req)
        .then(response => expect(response.message).to.equal(expectedResponse));
    });

    it('should return an error message if error occurs when accessing database', () => {
      const error = {
        message: 'database error'
      };

      td.when(User.findOne(input)).thenReject(error);
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
    const jwt = {
      sign: td.func()
    };
    const payload = td.object();
    process.env.TOKEN_PASSWORD = 'abc123';
    const inputMessage = 'Signup Successful, ';
    it('should create a token', () => {
      td.when(jwt.sign(payload, process.env.TOKEN_PASSWORD, {
        expiresIn: '1h'
      })).thenReturn('token');


      const response = UserController.sendResponseWithToken(data, inputMessage);

      expect(response.message).to.equal('Signup Successful, Login Successful');
      expect(response.statusCode).to.equal(200);
      expect(response.data).to.eql(data);
    });
  //   it('should return error message when token creation fails', () => {
  //     const jwtResponse = {
  //       message: 'Error Message'
  //     };
  //     td.when(jwt.sign(payload, process.env.TOKEN_PASSWORD, {
  //       expiresIn: '1h'
  //     })).thenReturn(jwtResponse);

  //     const response = UserController.sendResponseWithToken(data, inputMessage);

  //     expect(response.message).to.equal(`Signup Successful, ${jwtResponse.message}`);
  //     expect(response.statusCode).to.equal(500);
  //   });
  });
});