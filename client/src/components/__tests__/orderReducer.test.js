import orderReducer from '../../redux/reducers/orderReducer';
import { orderTypes } from '../../redux/types';
import { order, allOrders } from '../mocks/orderDataMock';

describe('post orderReducer', () => {
  const initialState = {
    connecting: false,
    orderError: null,
    orders: []
  };
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ORDER_REQUEST', () => {
    const newState = {
      connecting: true,
      orderError: null,
      orders: []
    };
    const action = { type: orderTypes.ORDER_REQUEST };
    expect(orderReducer(undefined, action)).toEqual(newState);
  });

  it('should handle GET_ORDER_ALL_SUCCESS', () => {
    const newState = {
      orders: allOrders.data
    };
    const action = { type: orderTypes.GET_ORDER_ALL_SUCCESS, orders: allOrders.data };

    expect(orderReducer(undefined, action)).toEqual(newState);
  });

  it('should handle ORDER_FAILURE', () => {
    const newState = {
      connecting: false,
      orderError: { message: 'error' },
      orders: []
    };
    const action = { type: orderTypes.ORDER_FAILURE, error: { message: 'error' } };

    expect(orderReducer(undefined, action)).toEqual(newState);
  });

  it('should handle POST_ORDER_SUCCESS', () => {
    const newState = {
      orders: [order.data]
    };
    const action = { type: orderTypes.POST_ORDER_SUCCESS, order: order.data };
    expect(orderReducer(undefined, action)).toEqual(newState);
  });
  it('should handle UPDATE_ORDER_SUCCESS', () => {
    const newOrder = { ...order.data, mealList: ['ghi', 'jkl'] };
    const oldState = {
      orders: [order.data]
    };
    const newState = {
      orders: [newOrder]
    };
    const action = { type: orderTypes.UPDATE_ORDER_SUCCESS, order: newOrder };
    expect(orderReducer(oldState, action)).toEqual(newState);
  });
});
