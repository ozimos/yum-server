import {
  orderTypes
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
    case orderTypes.ORDER_REQUEST:
      return {
        ...state,
        connecting: true,
        orderError: null
      };
    case orderTypes.ORDER_MEALS_REQUEST:
      return {
        ...state,
        orders: (() => {
          let isNewOrder = true;
          const newOrders = state.orders.map((order) => {
            if (order.id === action.order.id) {
              isNewOrder = false;
              return { ...order, ...action.order };
            }
            return order;
          });
          return isNewOrder ? [...newOrders, action.order] : newOrders;
        })(),
      };
    case orderTypes.GET_ORDER_MEAL_FAILURE:
      return {
        ...state,
        connecting: false,
        orders: state.orders.map((order) => {
          if (order.id === action.order.id) {
            return { ...order, ...action.order };
          }
          return order;
        }),
      };
    case orderTypes.GET_ORDER_ALL_SUCCESS:
      return {
        orders: action.orders.map((order) => {
          const oldOrder = state.orders
            .find(currentOrder => currentOrder.id === order.id);
          return oldOrder ? { ...oldOrder, ...order } : order;
        }),
        pagination: action.pagination
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
        pagination: { ...state.pagination,
          count: state.pagination.count + 1 },
      };
    case orderTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        connecting: false,
        orders: state.orders.map((order) => {
          if (order.id === action.order.id) {
            return action.order;
          }
          return order;
        }),
      };
    case orderTypes.GET_ORDER_MEAL_SUCCESS:
      return {
        ...state,
        connecting: false,
        orders: (() => {
          let isNewOrder = true;
          const newOrders = state.orders.map((order) => {
            if (order.id === action.order.id) {
              isNewOrder = false;
              return { ...order, ...action.order };
            }
            return order;
          });
          return isNewOrder ? [...newOrders, action.order] : newOrders;
        })(),
      };
    default:
      return state;
  }
};
