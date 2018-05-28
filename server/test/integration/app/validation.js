/* eslint-disable no-console */
import {
  expect,
  request,
  rootURL,
  token,
} from '../../../testHelpers/appHelper';
import app from '../../../src/app';

const mealsUrl = `${rootURL}/meals`;

// Create A Meal
describe('validation errors are in json format', () => {
  const incorrectMeal = {
    description: 'plain rice with ground beef',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/11/23/13/50/pumpkin-soup-2972858_960_720.jpg',
  };
  it('should return an error message in json format', () => request(app).post(mealsUrl)
    .set('authorization', `JWT ${token}`).send(incorrectMeal)
    .then((res) => {
      expect(res.body.message).to.be.an('object');
      expect(res.body.message.details[0].message).to.include('is required');
    }));

});