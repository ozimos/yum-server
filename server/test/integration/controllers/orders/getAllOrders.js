import {
  expect,
  defaultUser,
  orderController
} from '../../../../testHelpers/controllerHelper';
import db from '../../../../src/models';

describe('Integration Controller Get Orders', () => {
  beforeEach('truncate orders db', async () => {
    await db.Order.truncate({
      cascade: true
    });
  });
  const query = { offset: 0, limit: 8 };
  const decoded = { userId: defaultUser.id, isCaterer: defaultUser.isCaterer };
  it(
    'getOrdersWithMealLinks returns error message if no orders in db',
    async () => {
      const response = await orderController
        .getOrdersWithMealLinks({ query, decoded });
      expect(response.message).to.equal('no records available');
      expect(response.statusCode).to.equal(404);
    }
  );
});
