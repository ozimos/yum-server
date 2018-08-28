import dashboardReducer from '../../redux/reducers/dashboardReducer';
import { dashboardTypes } from '../../redux/types';
import { allOrders } from '../mocks/orderDataMock';

describe('dashboardReducer', () => {

  it('should handle ORDER_DASHBOARD_REQUEST', () => {
    const newState = {
      connecting: true,
      orderError: null,
      orders: []
    };
    const action = { type: dashboardTypes.ORDER_DASHBOARD_REQUEST };
    expect(dashboardReducer(undefined, action)).toEqual(newState);
  });

  it('should handle GET_ORDER_DASHBOARD_SUCCESS', () => {
    const newState = {
      orders: allOrders.data
    };
    const action = { type: dashboardTypes.GET_ORDER_DASHBOARD_SUCCESS,
      orders: allOrders.data };

    expect(dashboardReducer(undefined, action)).toMatchObject(newState);
  });

  it('should handle ORDER_DASHBOARD_FAILURE', () => {
    const newState = {
      connecting: false,
      orderError: { message: 'error' },
      orders: []
    };
    const action = { type: dashboardTypes.ORDER_DASHBOARD_FAILURE,
      error: { message: 'error' } };

    expect(dashboardReducer(undefined, action)).toEqual(newState);
  });
});
