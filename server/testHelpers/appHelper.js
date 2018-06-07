/* eslint import/no-extraneous-dependencies: off */
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';

import app from '../src/app';
import { seedUsers, seedMeals } from '../src/seedFiles';

chai.use(chaiHttp);
export const {
  expect, request
} = chai;


export const defaultUser = seedUsers[0];
export const defaultMeal = seedMeals[0];
export const menuMeal = seedMeals[1];
export const deleteMeal = seedMeals[2];
export const extraMeal = seedMeals[3];

export const payload = {
  isCaterer: defaultUser.isCaterer,
  userId: defaultUser.id
};
const payloadNonAdmin = {
  isCaterer: seedUsers[1].isCaterer,
  userId: seedUsers[1].id
};
export const token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
  expiresIn: '1h'
});
export const tokenUser = jwt.sign(payloadNonAdmin, process.env.TOKEN_PASSWORD, {
  expiresIn: '1h'
});
// endpoint urls
export const rootURL = '/api/v1';
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
        const res = await boundRequest()
          .set('authorization', `JWT ${token}`)
          .send(content);
        return expect(res).to.have.status(status);
      } catch (err) {
        throw err;
      }
    });

    it('response should be json', async () => {
      try {
        const res = await boundRequest()
          .set('authorization', `JWT ${token}`)
          .send(content);
        return expect(res).to.have.header('content-type', /json/);
      } catch (err) {
        throw err;
      }
    });
    it('response should have required keys', async () => {
      try {
        const res = await boundRequest()
          .set('authorization', `JWT ${token}`)
          .send(content);
        return expect(res.body.data).to.include.all.keys(key);
      } catch (err) {
        throw err;
      }
    });
    it('response data to be of required type', async () => {
      try {
        const res = await boundRequest()
          .set('authorization', `JWT ${token}`)
          .send(content);
        return expect(res.body.data).to.be.an(type);
      } catch (err) {
        throw err;
      }
    });
  });
};