/* eslint-disable no-console */
import {
  expect,
  request,
  rootURL,
  defaultMeal,
  token,
  templateTest
} from './helper';

import app from '../../src/app';

const menuUrl = `${rootURL}/menu`;
context('menu integration test', () => {

  // Post Menu
  describe('POST /menu', () => {
    const newMenu = {
      description: 'Thursday Menu',
      meals: [defaultMeal.id]
    };

    it('should create a menu', () =>
      request(app)
        .post(menuUrl)
        .set('authorization', `JWT ${token}`)
        .send(newMenu)
        .then((res) => {
          expect(res.body.data.description).to.equal(newMenu.description);
        }));
    templateTest('Add Menu', 'post', menuUrl, newMenu, 'description', 'object', '201');
  });
  // Get  Menu
  describe('GET /menu', () => {
    it('should return the menu for today', () =>
      request(app)
        .get(menuUrl)
        .set('authorization', `JWT ${token}`)
        .then((res) => {
          expect(res.body.data.Meals[0].id).to.equal(defaultMeal.id);
        }));
    templateTest('Get Menu', 'get', menuUrl, null, 'Meals', 'object');
  });
});