/* eslint-disable no-console */
import {
  User,
  expect,
  request,
  defaultUser,
  defaultPassword,
  rootURL
} from './helper';
import app from '../../src/app';

describe('Routes Users', () => {
  const signUpUrl = `${rootURL}/auth/signup`;
  const logInUrl = `${rootURL}/auth/login`;


  before(async () => {
    try {
      await User.truncate({
        cascade: true
      });
      await User.create(defaultUser);
    } catch (error) {
      console.log(error);
    }
  });
  // SignUp A User
  describe('POST /auth/signup', () => {
    const newUser = {
      firstName: 'Tovieye',
      lastName: 'Ozi',
      email: 'tovieye.ozi@gmail.com',
      password: 'abc123',
      confirmPassword: 'abc123',
    };
    it('should signup a new user', () => request(app).post(signUpUrl)
      .send(newUser).then((res) => {
        expect(res.body.data.email).to.equal(newUser.email);
        // eslint-disable-next-line
        expect(res.body.token).to.exist;
      }));
  });

  // Login A User
  describe('POST /auth/login', () => {
    const credentials = {
      email: defaultUser.email,
      password: defaultPassword,
    };
    it('should login new user', () => request(app).post(logInUrl).send(credentials).then((res) => {
      expect(res.body.data.email).to.equal(defaultUser.email);
      // eslint-disable-next-line
      expect(res.body.token).to.exist;
    }));
  });
});