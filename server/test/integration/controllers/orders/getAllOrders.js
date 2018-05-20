import {
  expect,
  defaultMeal,
  defaultMeal2,
  defaultUser,
  orderController
} from '../../../../testHelpers/controllerHelper';
// import db from '../../../../src/models';

describe('Integration Controller Get Orders', () => {
  // beforeEach('truncate orders db', async () => {
  //   await db.Order.truncate({
  //     cascade: true
  //   });
  // });

  it('getAllOrders returns error message if no orders in db', async () => {
    const response = await orderController.getAllRecords();
    expect(response.message).to.equal('no records available');
    expect(response.statusCode).to.equal(404);
  });


  it('getAllOrders returns all orders in db', async () => {
    const decoded = {
      userId: defaultUser.id
    };
    const body = {
      meals: [{
        id: defaultMeal.id,
        quantity: 1
      },
      {
        id: defaultMeal2.id,
        quantity: 2
      }
      ]
    };
    await orderController.postOrder({
      decoded,
      body
    });
    const response = await orderController.getAllOrders();
    expect(response.data[0].Meals[0].id).to.equal(body.meals[0].id);
    expect(response.data[0].Meals[0].MealOrders.quantity).to.equal(body.meals[0].quantity);
    expect(response.data[0].Meals.length).to.equal(body.meals.length);

    // eslint-disable-next-line
    expect(response.data[0].id).to.exist;
    expect(response.statusCode).to.equal(200);
  });
});