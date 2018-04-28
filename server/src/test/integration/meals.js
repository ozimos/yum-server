import {
  expect,
  request,
  mealsUrl,
  mealIdUrl,
  templateTest
} from './helper';

const defaultMeal = {
  id: 1,
  title: 'Beef with Rice',
  description: 'plain rice with ground beef',
  price: 1500,
};

// Get All Meals
describe('GET /meals', () => {
  it('should return all meals', () => request.get(mealsUrl)
    .then((res) => {
      expect(res.body[0].id).to.equal(defaultMeal.id);
      expect(res.body[0].price).to.equal(defaultMeal.price);
    }));
  templateTest('Get All Meals', 'get', mealsUrl, null, '0', 'array');
});
// Get One Meal
describe('GET /meals/:id', () => {
  it('should return a meal', () =>
    request.get(mealIdUrl)
      .then((res) => {
        expect(res.body.title).to.equal(defaultMeal.title);
        expect(res.body.price).to.equal(defaultMeal.price);
      }));
  templateTest('Get Meal', 'get', mealIdUrl, null, 'price', 'object');
});
// Update A Meal
describe('PUT /meals/:id', () => {
  const updatedMeal = {
    title: 'Updated meal',
    price: 1500,
  };

  it('should update a meal', () => request.put(mealIdUrl)
    .send(updatedMeal).then((res) => {
      expect(res.body[0].title).to.equal(updatedMeal.title);
      expect(res.body[0].price).to.equal(updatedMeal.price);
    }));
  templateTest('Modify Meal', 'put', mealIdUrl, updatedMeal, '0', 'array');
});

// Create A Meal
describe('POST /meals', () => {
  const newMeal = {
    title: 'Beef with Rice',
    description: 'plain rice with ground beef',
    price: 1500,
  };
  it('should create a meal', () => request.post(mealsUrl)
    .send(newMeal).then((res) => {
      expect(res.body.title).to.equal(newMeal.title);
      expect(res.body.description).to.equal(newMeal.description);
    }));
  templateTest('Add Meal', 'post', mealsUrl, newMeal, 'price', 'object', '201');
});

// Delete A Meal
describe('DELETE /meals', () => {
  it('should delete a meal', () => request.delete(mealIdUrl)
    .then((res) => {
      expect(res).to.have.status(200);
    }));
});