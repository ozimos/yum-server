/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import {
  expect,
  request,
  rootURL,
  Meal,
  Menu,
  defaultMeal,
  payload,
  templateTest
} from './helper';

import app from '../../src/app';

const menuUrl = `${rootURL}/menu`;
const defaultMenu = {
  description: 'Continental, Local',
};
context('menu integration test', () => {

// truncates Meal & Menu and creates new row entries before test
// Creates JWT before test
  let token;
  before(async () => {
    try {
      await Meal.truncate({
        cascade: true
      });
      await Menu.truncate({
        cascade: true
      });
      await Menu.create(defaultMenu);
      await Meal.create(defaultMeal);
      token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
        expiresIn: '1h'
      });
    } catch (error) {
      console.log(error);
    }
  });

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
