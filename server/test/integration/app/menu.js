/* eslint-disable no-console */
import {
  expect,
  request,
  rootURL,
  menuMeal,
  token,
  templateTest
} from '../../../testHelpers/appHelper';

import app from '../../../src/app';

const menuUrl = `${rootURL}/menu`;
context('menu integration test', () => {

  // Post Menu
  describe('POST /menu', () => {
    const newMenu = {
      meals: [menuMeal.id]
    };
    templateTest('Add Menu', 'post', menuUrl, newMenu, 'id', 'object', '201');
  });
  // Get  Menu
  describe('GET /menu', () => {
    it('should return the menu for today', () =>
      request(app)
        .get(menuUrl)
        .set('authorization', `JWT ${token}`)
        .then((res) => {
          expect(res.body.data.Meals[0].id).to.equal(menuMeal.id);
        }));
    templateTest('Get Menu', 'get', menuUrl, null, 'Meals', 'object');
  });
});
