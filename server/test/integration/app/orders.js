
import {
  expect,
  request,
  rootURL,
  token,
} from '../../../testHelpers/appHelper';
import app from '../../../src/app';

const getOrdersUrl = `${rootURL}/orders?offset=0&limit=5`;

context('orders integration test', () => {


  // Get All Orders
  describe('GET /orders', () => {
    it(
      'should return error message if no orders',
      () => request(app).get(getOrdersUrl)
        .set('authorization', `JWT ${token}`)
        .then((res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('no records available');
        })
    );
  });

});
