import {
  dashboardTypes
} from '../types';

const initialState = {
  connecting: false,
  orderError: null,
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case dashboardTypes.ORDER_DASHBOARD_REQUEST:
      return {
        ...state,
        connecting: true,
        orderError: null
      };
    case dashboardTypes.GET_ORDER_DASHBOARD_SUCCESS:
      return {
        ...state,
        orders: action.orders,
      };
    case dashboardTypes.ORDER_DASHBOARD_FAILURE:
      return {
        ...state,
        connecting: false,
        orderError: action.error
      };
    default:
      return state;
  }
};
