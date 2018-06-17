import {
  orderTypes
} from '../types';

const initialState = {
  connecting: false,
  orderError: null,
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case orderTypes.ORDER_REQUEST:
      return {
        ...state,
        connecting: true,
        orderError: null
      };
    case orderTypes.GET_ORDER_ALL_SUCCESS:
      return {
        orders: action.orders,
      };
    case orderTypes.ORDER_FAILURE:
      return {
        ...state,
        connecting: false,
        orderError: action.error
      };
    case orderTypes.POST_ORDER_SUCCESS:
      return {
        orders: [...state.orders, action.order],
      };
    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        orders: state.orders.map((order) => {
          if (order.id === action.order.id) {
            return action.order;
          }
          return order;
        })
      };
    default:
      return state;
  }
};