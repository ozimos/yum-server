/* eslint import/no-extraneous-dependencies: off */
import {
  expect,
  defaultMeal,
  defaultMeal2,
  defaultUser,
  orderController
} from '../../../../testHelpers/controllerHelper';

const decoded = {
  userId: defaultUser.id
};
const body = {
  meals: [{
    id: defaultMeal.id,
    quantity: 1
  }]
};
let orderId;
describe('Modify Order:', () => {

  before('add order to db', async () => {
    const response = await orderController.postOrder({
      decoded,
      body
    });
    orderId = response.data.id;
  });
  describe('Modify Order:', () => {
    it('updateOrder returns all orders in db', async () => {
      const body2 = {
        meals: [{
          id: defaultMeal.id,
          quantity: 1
        },
        {
          id: defaultMeal2.id,
          quantity: 3
        }
        ]
      };
      const params = {
        id: orderId
      };
      const req = {
        params,
        body: body2
      };
      const response = await orderController.updateOrder(req);
      expect(response.data.mealList)
        .to.include.members([body2.meals[0].id, body2.meals[1].id]);
      expect(response.data.quantityList).to.include
        .members([body2.meals[0].quantity, body2.meals[1].quantity]);
      expect(response.data.mealList.length).to.equal(body2.meals.length);
      expect(response.data.id).to.be.a('string');
      expect(response.statusCode).to.equal(200);
    });
  });
});