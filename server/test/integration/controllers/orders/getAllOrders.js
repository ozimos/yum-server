import {
  expect,
  defaultMeal,
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
describe('Integration Controller Orders All,', () => {
  describe('No Orders in db', () => {

    it('getAllOrders returns error message if no orders in db', async () => {
      const response = await orderController.getAllRecords();
      expect(response.message).to.equal('no records available');
      expect(response.statusCode).to.equal(404);
    });
  });

  describe('Get All Orders:', () => {
    beforeEach('add order to db', async () => {
      await orderController.postOrder({
        decoded,
        body
      });
    });
    it.skip('getAllOrders returns all orders in db', async () => {
      const response = await orderController.getAllOrders();
      expect(response.data.Meals[0].id).to.equal(body.meals[0].id);
      expect(response.data.Meals[0].MealOrders.quantity).to.equal(body.meals[0].quantity);
      // eslint-disable-next-line
      expect(response.data.id).to.exist;
      expect(response.statusCode).to.equal(200);
    });
  });
});