import menuReducer from '../../src/redux/reducers/menuReducer';
import { menuTypes } from '../../src/redux/types';
import { meal, allMeals } from '../__mocks__/mealDataMock';

describe('post menuReducer', () => {
  const initialState = {
    connecting: false,
    menuError: null,
    menu: [],
    menuDetails: {},
    pagination: {
      limit: 10,
      offset: 0,
      count: 1,
      pages: 1 }
  };
  it('should return the initial state for unknown action type', () => {
    expect(menuReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle MENU_REQUEST', () => {
    const newState = {
      connecting: true,
      menuError: null,
      menu: [],
      menuDetails: {},
      pagination: {
        limit: 10,
        offset: 0,
        count: 1,
        pages: 1 }
    };
    const action = { type: menuTypes.MENU_REQUEST };
    expect(menuReducer(undefined, action)).toEqual(newState);
  });

  it('should handle GET_MENU_SUCCESS', () => {
    const newState = {
      connecting: false,
      pagination: {},
      menuDetails: {},
      menu: allMeals.data
    };
    const action = {
      type: menuTypes.GET_MENU_SUCCESS,
      menu: allMeals.data,
      pagination: {},
      menuDetails: {},

    };

    expect(menuReducer(undefined, action)).toMatchObject(newState);
  });

  it('should handle MENU_FAILURE', () => {
    const newState = {
      connecting: false,
      menuError: { message: 'error' },
      menu: []
    };
    const action = {
      type: menuTypes.MENU_FAILURE, error: { message: 'error' } };

    expect(menuReducer(undefined, action)).toMatchObject(newState);
  });

  it('should handle POST_MENU_SUCCESS', () => {
    const newState = {
      menu: [meal.data],
      pagination: {
        limit: 10,
        offset: 0,
        count: 1,
        pages: 1 }
    };
    const action = {
      type: menuTypes.POST_MENU_SUCCESS,
      menu: [meal.data],
      pagination: {
        limit: 10,
        offset: 0,
        count: 1,
        pages: 1 }
    };
    expect(menuReducer(undefined, action)).toMatchObject(newState);
  });
});
