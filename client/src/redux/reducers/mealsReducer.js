import {
  mealTypes
} from '../types';

const initialState = {
  loadState: null,
  mealError: null,
  meals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case mealTypes.MEALS_REQUEST:
      return {
        ...state,
        loadState: 'loading',
        mealError: null
      };
    case mealTypes.ALL_MEALS_SUCCESS:
      return {
        loadState: 'success',
        meals: action.meals,
        mealError: null
      };
    case mealTypes.MEALS_FAILURE:
      return {
        ...state,
        loadState: 'failure',
        mealError: action.error
      };
    case mealTypes.CREATE_MEAL_SUCCESS:
      return {
        loadState: 'success',
        meals: [...state.meals, action.meals],
        mealError: null
      };
    case mealTypes.UPDATE_MEAL_SUCCESS:
      return {
        loadState: 'success',
        mealError: null,
        meals: state.meals.map((meal) => {
          if (meal.id === action.meals.id) {
            return action.meals;
          }
          return meal;
        })
      };
    default:
      return state;
  }
};