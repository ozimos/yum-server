import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import dashboardActions from '../../redux/actions/dashboardActions';
import dashboardTypes from '../../redux/types/dashboardTypes';
import { allOrders, order } from '../mocks/orderDataMock';

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

    moxios.stubRequest('/api/v1/orders?limit=10&offset=0', {
      status: 200,
      response: allOrders
    });
    const expectedActions = [
      { type: dashboardTypes.ORDER_DASHBOARD_REQUEST },
      { type: dashboardTypes.ORDER_DASHBOARD_HISTORY_SUCCESS,
        orders: allOrders.data.rows },
    ];
    return store.dispatch(dashboardActions.getOrdersWithMealLinks())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  });
  it('dispatches ORDER_DASHBOARD_REQUEST and ORDER_DASHBOARD_FAILURE ' +
  'on failing to fetch all orders', () => {

    moxios.stubRequest('/api/v1/orders?limit=10&offset=0', {
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
  it('dispatches ORDER_REQUEST and GET_ORDER_ALL_SUCCESS' +
  ' on successfully fetching meal orders', () => {

    moxios.stubRequest(
      // eslint-disable-next-line
      '/api/v1/orders/51c6b0ee-0ac0-43b2-9972-7d44683dfe07/meals?limit=4&offset=0',
      {
        status: 200,
        response: order
      }
    );
    const expectedActions = [
      { type: dashboardTypes.ORDER_MEALS_DASHBOARD_REQUEST },
      { type: dashboardTypes.ORDER_MEALS_DASHBOARD_SUCCESS,
        orderMeals: order.data.rows[0].Meals },
    ];
    return store.dispatch(dashboardActions
      .getMealsInOrder('51c6b0ee-0ac0-43b2-9972-7d44683dfe07'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toMatchObject(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and ORDER_FAILURE' +
  ' on failing to fetch meal orders', () => {

    moxios.stubRequest(
      // eslint-disable-next-line
      '/api/v1/orders/51c6b0ee-0ac0-43b2-9972-7d44683dfe07/meals?limit=4&offset=0',
      {
        status: 400,
        response: { message: 'problem' }
      }
    );
    const expectedActions = [
      { type: dashboardTypes.ORDER_MEALS_DASHBOARD_REQUEST },
      { type: dashboardTypes.ORDER_MEALS_DASHBOARD_FAILURE,
        orderMealsError: 'problem' },
    ];
    return store.dispatch(dashboardActions
      .getMealsInOrder('51c6b0ee-0ac0-43b2-9972-7d44683dfe07'))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
});
