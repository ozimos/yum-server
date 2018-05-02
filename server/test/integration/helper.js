/* eslint import/no-extraneous-dependencies: off */
import chai from 'chai';
import bcrypt from 'bcryptjs';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import token from 'jsonwebtoken';
import app from '../../src/app';
import db from '../../src/models';

chai.use(chaiHttp);
export const {
  expect, request
} = chai;
dotenv.config();
export const defaultPassword = 'test123';
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(defaultPassword, salt);

export const {
  User
} = db;

export const jwt = token;

export const defaultUser = {
  id: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
  firstName: 'Tovieye',
  lastName: 'Ozi',
  email: 'ad.min@gmail.com',
  passwordHash,
  isCaterer: true
};

export const payload = {
  isCaterer: defaultUser.isCaterer,
  id: defaultUser.id
};

// endpoint urls
export const rootURL = '/api/v1';
export const mealsUrl = `${rootURL}/meals`;
export const mealIdUrl = `${rootURL}/meals/1`;
export const menuUrl = `${rootURL}/menu`;
export const ordersUrl = `${rootURL}/orders`;
export const orderIdUrl = `${rootURL}/orders/1`;

// sample data for test

/**
 * Generates new tests with a template
 * @param {string} title name of test
 * @param {string} method HTTP verb
 * @param {string} url API Endpoint
 * @param {object} content req.body content
 * @param {string} key one key in res.body
 * @param {string} type data type in res.body
 * @param {string} status HTTP response status
 * @returns {function} mocha test suite
 */

export const templateTest = function generateTest(title, method, url, content, key, type, status = '200') {
  let requester, boundRequest;
  beforeEach('create http server', () => {
    requester = request(app);
    boundRequest = requester[method].bind(request, url);
  });

  describe(title, () => {
    it('return 200 for successful', async () => {
      try {
        const res = await boundRequest().send(content);
        return expect(res).to.have.status(status);
      } catch (err) {
        throw err;
      }
    });

    it('response should be json', async () => {
      try {
        const res = await boundRequest().send(content);
        return expect(res).to.have.header('content-type', /json/);
      } catch (err) {
        throw err;
      }
    });
    it('response should have required keys', async () => {
      try {
        const res = await boundRequest().send(content);
        return expect(res.body).to.include.all.keys(key);
      } catch (err) {
        throw err;
      }
    });
    it('response message to be of required type', async () => {
      try {
        const res = await boundRequest().send(content);
        return expect(res.body).to.be.an(type);
      } catch (err) {
        throw err;
      }
    });
  });
};