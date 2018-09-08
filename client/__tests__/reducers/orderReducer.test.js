import orderReducer from '../../src/redux/reducers/orderReducer';
import { orderTypes } from '../../src/redux/types';
import { orderMeals } from '../__mocks__/orderDataMock';

describe(' orderReducer', () => {
  const initialState = {
    connecting: false,
    loadingMeals: false,
    orderError: null,
    orderMealsError: null,
    orders: [],
    pendingOrders: [],
    orderMeals: [],
    total: 0,
    mealsPagination: {
      limits: 5,
      offset: 0,
      count: 1,
      pages: 1 },
    pagination: {
      limits: 10,
      offset: 0,
      count: 1,
      pages: 1 }
  };
  const updatedOrder = {
    id: 'order1',
    Meals: ['abc', 'def']
  };
  const newOrder = {
    id: 'order4',
    Meals: ['abc', 'def']
  };
  const oldOrders = [
    {
      id: 'order1',
      Meals: ['ghi', 'jkl']
    },
    {
      id: 'order2',
      Meals: ['mno', 'pqr']
    },
    {
      id: 'order3',
      Meals: ['stu', 'vwx']
    }
  ];
  const newOrders = [
    {
      id: 'order1',
      Meals: ['abc', 'def']
    },
    {
      id: 'order2',
      Meals: ['mno', 'pqr']
    },
    {
      id: 'order3',
      Meals: ['stu', 'vwx']
    }
  ];

  it('should return the initial state for unknown action type', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should set loading state on fetching orders', () => {
    const newState = {
      connecting: true,
      orderError: null,
      orders: []
    };
    const action = { type: orderTypes.ORDER_REQUEST };
    expect(orderReducer(undefined, action)).toMatchObject(newState);
  });

  it('should set loading state on fetching meals', () => {
    const newState = {
      loadingMeals: true
    };
    const action = { type: orderTypes.ORDER_MEALS_REQUEST };
    expect(orderReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add orders to state', () => {
    const newState = {
      orders: oldOrders
    };
    const action = { type: orderTypes.GET_ORDER_ALL_SUCCESS,
      orders: oldOrders };

    expect(orderReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add the error message on failing to fetch orders', () => {
    const newState = {
      connecting: false,
      orderError: { message: 'error' },
      orders: []
    };
    const action = { type: orderTypes.ORDER_FAILURE,
      error: { message: 'error' } };

    expect(orderReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add the error message on failing to fetch order meals ', () => {
    const newState = {
      loadingMeals: false,
      orderMealsError: { message: 'error' },
    };
    const action = { type: orderTypes.GET_ORDER_MEAL_FAILURE,
      orderMealsError: { message: 'error' } };

    expect(orderReducer(undefined, action)).toMatchObject(newState);
  });

  it('should add new orders to state', () => {
    const oldState = {
      orders: oldOrders,
      pendingOrders: [],
      pagination: { count: 2 },
    };
    const newState = {
      orders: [newOrder, ...oldOrders],
      pendingOrders: [newOrder],
      pagination: { count: 3 },

    };
    const action = { type: orderTypes.POST_ORDER_SUCCESS, order: newOrder };
    expect(orderReducer(oldState, action)).toMatchObject(newState);
  });
  it('should add fetched meals to state', () => {
    const oldState = {
      orders: oldOrders,
      pendingOrders: [],
      pagination: { count: 2 },
    };
    const newState = {
      loadingMeals: false,
      orderMeals,
      mealsPagination: { offset: 2 },

    };
    const action = { type: orderTypes.GET_ORDER_MEAL_SUCCESS,
      orderMeals,
      mealsPagination: { offset: 2 } };
    expect(orderReducer(oldState, action)).toMatchObject(newState);
  });

  it('should add updated orders to state', () => {
    const oldState = {
      orders: oldOrders,
      pendingOrders: [oldOrders[0], oldOrders[1]]
    };
    const newState = {
      orders: newOrders,
      pendingOrders: [updatedOrder, oldOrders[1]]
    };

    const action = { type: orderTypes.UPDATE_ORDER_SUCCESS,
      order: updatedOrder };
    expect(orderReducer(oldState, action)).toMatchObject(newState);
  });

  it('should add order total to state', () => {

    const newState = {
      total: 20
    };

    const action = { type: orderTypes.GET_ORDER_TOTAL_SUCCESS,
      total: 20 };
    expect(orderReducer(undefined, action)).toMatchObject(newState);
  });

  it('should remove not pending orders from state', () => {
    const oldState = {
      pendingOrders: [updatedOrder],
    };
    const newState = {
      pendingOrders: []
    };
    const action = { type: orderTypes.UPDATE_PENDING, id: updatedOrder.id };
    expect(orderReducer(oldState, action)).toMatchObject(newState);
  });
});

