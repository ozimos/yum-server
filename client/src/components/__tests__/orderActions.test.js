import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import orderActions from '../../redux/actions/orderActions';
import orderTypes from '../../redux/types/orderTypes';
import { allOrders, order } from '../mocks/orderDataMock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  connecting: false,
  mealError: null,
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

  it('dispatches ORDER_REQUEST and GET_ORDER_ALL_SUCCESS on successfully fetching orders', () => {

    moxios.stubRequest('/api/v1/orders', {
      status: 200,
      response: allOrders
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.GET_ORDER_ALL_SUCCESS, orders: allOrders.data },
    ];
    return store.dispatch(orderActions.getAllOrders())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and ORDER_FAILURE on failing fetching orders', () => {

    moxios.stubRequest('/api/v1/orders', {
      status: 400,
      response: { message: 'problem' }
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.ORDER_FAILURE, error: 'problem' },
    ];
    return store.dispatch(orderActions.getAllOrders())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and GET_ORDER_ALL_SUCCESS on successfully fetching orders', () => {

    moxios.stubRequest('/api/v1/orders/user/', {
      status: 200,
      response: allOrders
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.GET_ORDER_ALL_SUCCESS, orders: allOrders.data },
    ];
    return store.dispatch(orderActions.getUserOrdersByDate())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and ORDER_FAILURE on failing fetching orders', () => {

    moxios.stubRequest('/api/v1/orders/user/', {
      status: 400,
      response: { message: 'problem' }
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.ORDER_FAILURE, error: 'problem' },
    ];
    return store.dispatch(orderActions.getUserOrdersByDate())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and GET_ORDER_ALL_SUCCESS on successfully fetching orders', () => {

    moxios.stubRequest('/api/v1/orders/all/', {
      status: 200,
      response: allOrders
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.GET_ORDER_ALL_SUCCESS, orders: allOrders.data },
    ];
    return store.dispatch(orderActions.getOrdersByDate())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and ORDER_FAILURE on failing fetching orders', () => {

    moxios.stubRequest('/api/v1/orders/all/', {
      status: 400,
      response: { message: 'problem' }
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.ORDER_FAILURE, error: 'problem' },
    ];
    return store.dispatch(orderActions.getOrdersByDate())
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and POST_ORDER_SUCCESS on successfully creating a order', () => {

    moxios.stubRequest('/api/v1/orders', {
      status: 200,
      response: order
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.POST_ORDER_SUCCESS, order: order.data },
    ];
    return store.dispatch(orderActions.postOrder({}))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and ORDER_FAILURE on failing creating a order', () => {

    moxios.stubRequest('/api/v1/orders', {
      status: 400,
      response: { message: 'problem' }
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.ORDER_FAILURE, error: 'problem' },
    ];
    return store.dispatch(orderActions.postOrder({}))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and UPDATE_ORDER_SUCCESS on successfully updating a order', () => {
    const mealId = 'abc';
    moxios.stubRequest(`/api/v1/orders/${mealId}`, {
      status: 200,
      response: order
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.UPDATE_ORDER_SUCCESS, order: order.data },
    ];
    return store.dispatch(orderActions.updateOrder({}, mealId))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
  it('dispatches ORDER_REQUEST and ORDER_FAILURE on failing updating a order', () => {
    const mealId = 'abc';

    moxios.stubRequest(`/api/v1/orders/${mealId}`, {
      status: 400,
      response: { message: 'problem' }
    });
    const expectedActions = [
      { type: orderTypes.ORDER_REQUEST },
      { type: orderTypes.ORDER_FAILURE, error: 'problem' },
    ];
    return store.dispatch(orderActions.updateOrder({}, mealId))
      .then(() => {
        const dispatchedActions = store.getActions();
        expect(dispatchedActions).toEqual(expectedActions);
      });
  });
});