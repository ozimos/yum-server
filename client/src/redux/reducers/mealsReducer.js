import {
  mealTypes
} from '../types';

const initialState = {
  connecting: false,
  mealError: null,
  meals: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case mealTypes.MEALS_REQUEST:
      return {
        ...state,
        connecting: true,
        mealError: null
      };
    case mealTypes.ALL_MEALS_SUCCESS:
      return {
        meals: action.meals,
      };
    case mealTypes.MEALS_FAILURE:
      return {
        ...state,
        connecting: false,
        mealError: action.error
      };
    case mealTypes.CREATE_MEAL_SUCCESS:
      return {
        meals: [...state.meals, action.meal],
      };
    case mealTypes.UPDATE_MEAL_SUCCESS:
      return {
        meals: state.meals.map((meal) => {
          if (meal.id === action.meal.id) {
            return action.meals;
          }
          return meal;
        })
      };
    case mealTypes.DELETE_MEAL_SUCCESS:
      return {
        ...state,
        connecting: false,
        deleted: action.deleted
      };
    default:
      return state;
  }
};