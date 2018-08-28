import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dashboardActions from '../../redux/actions/dashboardActions';
import dashboardTypes from '../../redux/types/dashboardTypes';
import { allOrders } from '../mocks/orderDataMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  connecting: false,
  error: null,
  orders: []
});
describe('order async actions', () => {
  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('dispatches ORDER_DASHBOARD_REQUEST and GET_ORDER_DASHBOARD_SUCCESS' +
  ' on successfully fetching orders', () => {

    moxios.stubRequest('/api/v1/orders', {
      status: 200,
      response: allOrders
    });
    const expectedActions = [
      { type: dashboardTypes.ORDER_DASHBOARD_REQUEST },
      { type: dashboardTypes.ORDER_DASHBOARD_HISTORY_SUCCESS,
        orders: allOrders.data },
    ];
    return store.dispatch(dashboardActions.getOrdersWithMealLinks())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_DASHBOARD_REQUEST and ORDER_DASHBOARD_FAILURE ' +
  'on failing to fetch orders', () => {

    moxios.stubRequest('/api/v1/orders', {
      status: 400,
      response: { message: 'problem' }
    });
    const expectedActions = [
      { type: dashboardTypes.ORDER_DASHBOARD_REQUEST },
      { type: dashboardTypes.ORDER_DASHBOARD_HISTORY_FAILURE,
        error: 'problem' },
    ];
    return store.dispatch(dashboardActions.getOrdersWithMealLinks())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
});
