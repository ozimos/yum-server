import mealsReducer from '../../redux/reducers/mealsReducer';
import { mealTypes } from '../../redux/types';
import { meal, allMeals } from '../mocks/mealDataMock';

describe('mealsReducer', () => {
  const initialState = {
    connecting: false,
    mealError: null,
    meals: [],
    pagination: {
      limit: 10,
      offset: 0,
      count: 1,
      pages: 1 }
  };
  it('should return the initial state', () => {
    expect(mealsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle MEALS_REQUEST', () => {
    const newState = {
      connecting: true,
      mealError: null,
      meals: []
    };
    const action = { type: mealTypes.MEALS_REQUEST };
    expect(mealsReducer(undefined, action)).toMatchObject(newState);
  });

  it('should handle ALL_MEALS_SUCCESS', () => {
    const newState = {
      meals: allMeals.data,
      pagination: {}
    };
    const action = {
      type: mealTypes.ALL_MEALS_SUCCESS, meals: allMeals.data, pagination: {} };

    expect(mealsReducer(undefined, action)).toMatchObject(newState);
  });

  it('should handle MEALS_FAILURE', () => {
    const newState = {
      connecting: false,
      mealError: { message: 'error' },
      meals: []
    };
    const action = { type: mealTypes.MEALS_FAILURE,
      error: { message: 'error' } };

    expect(mealsReducer(undefined, action)).toMatchObject(newState);
  });

  it('should handle CREATE_MEAL_SUCCESS', () => {
    const newState = {
      meals: [meal.data]
    };
    const action = { type: mealTypes.CREATE_MEAL_SUCCESS, meal: meal.data };
    expect(mealsReducer(undefined, action)).toMatchObject(newState);
  });
  it('should handle UPDATE_MEAL_SUCCESS', () => {
    const beforeState = {
      connecting: true,
      meals: [{ id: 'mealId' }]
    };
    const newState = {
      meals: [meal.data]
    };
    const action = { type: mealTypes.UPDATE_MEAL_SUCCESS, meal: meal.data };
    expect(mealsReducer(beforeState, action)).toMatchObject(newState);
  });
  it('should handle DELETE_MEAL_SUCCESS', () => {
    const beforeState = {
      connecting: true,
      meals: [meal.data]
    };
    const newState = {
      connecting: false,
      meals: []
    };
    const action = { type: mealTypes.DELETE_MEAL_SUCCESS, id: 'mealId' };
    expect(mealsReducer(beforeState, action)).toEqual(newState);
  });
});
