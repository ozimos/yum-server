import {
  dashboardTypes
} from '../types';

const initialState = {
  connecting: false,
  orderError: null,
  orders: [],
  pagination: {
    limits: 10,
    offset: 0,
    count: 1,
    pages: 1 }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case dashboardTypes.ORDER_DASHBOARD_REQUEST:
      return {
        ...state,
        connecting: true,
        orderError: null
      };
    case dashboardTypes.ORDER_DASHBOARD_SUCCESS:
      return {
        ...state,
        orders: action.orders,
      };
      case dashboardTypes.ORDER_DASHBOARD_HISTORY_SUCCESS:
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
      case dashboardTypes.ORDER_DASHBOARD_HISTORY_FAILURE:
      return {
        ...state,
        connecting: false,
        orderError: action.error
      };
    default:
      return state;
  }
};
