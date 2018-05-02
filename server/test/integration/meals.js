/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import {
  expect,
  request,
  rootURL,
  Meal,
  User,
  defaultUser,
  defaultMeal,
  payload,
  templateTest
} from './helper';
import app from '../../src/app';

const mealsUrl = `${rootURL}/meals`;
const mealIdUrl = `${rootURL}/meals/${defaultMeal.id}`;

// truncates Meal & User and creates new row entries before test
// Creates JWT before test
let token;
before(async () => {
  try {
    await Meal.truncate({
      cascade: true
    });
    await User.truncate({
      cascade: true
    });
    await User.create(defaultUser);
    await Meal.create(defaultMeal);
    token = jwt.sign(payload, process.env.TOKEN_PASSWORD, {
      expiresIn: '1h'
    });
  } catch (error) {
    console.log(error);
  }
});
// Get All Meals
describe('GET /meals', () => {
  it('should return all meals', () => request(app).get(mealsUrl)
    .then((res) => {
      expect(res.body.data[0].id).to.equal(defaultMeal.id);
      expect(res.body.data[0].price).to.equal(defaultMeal.price);
    }));
  templateTest('Get All Meals', 'get', mealsUrl, null, '0', 'array');
});

// Get One Meal
describe('GET /meals/:id', () => {
  it('should return a meal', () =>
    request(app).get(mealIdUrl)
      .then((res) => {
        expect(res.body.data.title).to.equal(defaultMeal.title);
        expect(res.body.data.price).to.equal(defaultMeal.price);
      }));
  templateTest('Get Meal', 'get', mealIdUrl, null, 'price', 'object');
});
// Update A Meal
describe('PUT /meals/:id', () => {
  const updatedMeal = {
    title: 'Updated meal',
    price: 1500,
  };

  it('should update a meal', () => request(app).put(mealIdUrl)
    .set('authorization', `JWT ${token}`)
    .send(updatedMeal)
    .then((res) => {
      expect(res.body.data[1][0].title).to.equal(updatedMeal.title);
      expect(res.body.data[1][0].price).to.equal(updatedMeal.price);
    }));
  templateTest('Modify Meal', 'put', mealIdUrl, updatedMeal, '0', 'array');
});

// Create A Meal
describe('POST /meals', () => {
  const newMeal = {
    userId: 'db5e4fa9-d4df-4352-a2e4-bc57f6b68e9b',
    title: 'Beef with Rice',
    description: 'plain rice with ground beef',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/11/23/13/50/pumpkin-soup-2972858_960_720.jpg',
    price: 1500,
  };
  it('should create a meal', () => request(app).post(mealsUrl)
    .set('authorization', `JWT ${token}`).send(newMeal)
    .then((res) => {
      expect(res.body.data.title).to.equal(newMeal.title);
      expect(res.body.data.description).to.equal(newMeal.description);
    }));
  templateTest('Add Meal', 'post', mealsUrl, newMeal, 'price', 'object', '201');
});

// Delete A Meal
describe('DELETE /meals', () => {
  it('should delete a meal', () => request(app).delete(mealIdUrl)
    .set('authorization', `JWT ${token}`)
    .then((res) => {
      expect(res).to.have.status(200);
    }));
});

