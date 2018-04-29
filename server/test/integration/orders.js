import { expect, request, ordersUrl, orderIdUrl, templateTest } from './helper';

import app from '../../src/app';

const defaultOrder = {
  id: 1,
  userId: 1,
  menuId: 2,
  mealId: 2
};

// Get All Orders
describe('GET /orders', () => {
  it('should return all orders', () =>
    request(app).get(ordersUrl).then((res) => {
      expect(res.body[0].id).to.equal(defaultOrder.id);
      expect(res.body[0].menuId).to.equal(defaultOrder.menuId);
    }));
  templateTest('Get All Orders', 'get', ordersUrl, null, '0', 'array');
});
// Get One Order
describe('GET /orders/:id', () => {
  it('should return an order', () =>
    request(app).get(orderIdUrl).then((res) => {
      expect(res.body.menuId).to.equal(defaultOrder.menuId);
      expect(res.body.mealId).to.equal(defaultOrder.mealId);
    }));
  templateTest('Get Order', 'get', orderIdUrl, null, 'menuId', 'object');
});
// Update A Order
describe('PUT /orders/:id', () => {
  const updatedOrder = {
    menuId: 1,
    mealId: 1
  };

  it('should update an order', () =>
    request(app)
      .put(orderIdUrl)
      .send(updatedOrder)
      .then((res) => {
        expect(res.body[0].menuId).to.equal(updatedOrder.menuId);
        expect(res.body[0].mealId).to.equal(updatedOrder.mealId);
      }));
  templateTest('Modify Order', 'put', orderIdUrl, updatedOrder, '0', 'array');
});

// Create A Order
describe('POST /orders', () => {
  const newOrder = {
    userId: 1,
    menuId: 2,
    mealId: 3
  };
  it('should create a order', () =>
    request(app)
      .post(ordersUrl)
      .send(newOrder)
      .then((res) => {
        expect(res.body.menuId).to.equal(newOrder.menuId);
        expect(res.body.mealId).to.equal(newOrder.mealId);
      }));
  templateTest(
    'Add Order',
    'post',
    ordersUrl,
    newOrder,
    'mealId',
    'object',
    '201'
  );
});

// Delete A Order
describe('DELETE /orders', () => {
  it('should delete an order', () =>
    request(app).delete(orderIdUrl).then((res) => {
      expect(res).to.have.status(200);
    }));
});
