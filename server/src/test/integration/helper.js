/* eslint import/no-extraneous-dependencies: off */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
export const {
  expect
} = chai;
export const request = chai.request(app).keepOpen();

// endpoint urls
const rootURL = '/api/v1';
export const mealsUrl = `${rootURL}/meals`;
export const mealIdUrl = `${rootURL}/meals/1`;

// sample data for test

export const defaultMeal = {
  id: 1,
  title: 'Beef with Rice',
  description: 'plain rice with ground beef',
  price: 1500,
};


/**
 * Generates new tests with a template
 * @param {string} title
 * @param {string} method
 * @param {string} url
 * @param {object} payload
 * @param {string} key
 * @param {string} type
 * @param {string} status
 * @returns {function} mocha test suite
 */

export const templateTest = function generateTest(title, method, url, payload, key, type, status = '200') {
  describe(title, () => {
    const boundRequest = request[method].bind(request, url);
    it('return 200 for successful', async () => {
      try {
        const res = await boundRequest().send(payload);
        return expect(res).to.have.status(status);
      } catch (err) {
        throw err;
      }
    });

    it('response should be json', async () => {
      try {
        const res = await boundRequest().send(payload);
        return expect(res).to.have.header('content-type', /json/);
      } catch (err) {
        throw err;
      }
    });
    it('response should have required keys', async () => {
      try {
        const res = await boundRequest().send(payload);
        return expect(res.body).to.include.all.keys(key);
      } catch (err) {
        throw err;
      }
    });
    it('response message to be of required type', async () => {
      try {
        const res = await boundRequest().send(payload);
        return expect(res.body).to.be.an(type);
      } catch (err) {
        throw err;
      }
    });
  });
};