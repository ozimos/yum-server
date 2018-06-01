import {
  mealTypes
} from '../types';
import mealServices from '../../services/mealServices';

const request = actionType => ({
  type: actionType,
});
const success = (meals, actionType) => ({
  type: actionType,
  meals
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const getAllMeals = () => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  mealServices.getAllMeals('/api/v1/meals')
    .then(
      (meals) => {
        dispatch(success(meals.data, mealTypes.ALL_MEALS_SUCCESS));
      },
      (error) => {
        dispatch(failure(error.message, mealTypes.MEALS_FAILURE));
      }
    );
};


const createMeal = meal => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  mealServices.createMeal(meal, '/api/v1/meals')
    .then(
      (createdMeal) => {
        dispatch(success(createdMeal.data, mealTypes.CREATE_MEAL_SUCCESS));
      },
      (error) => {
        dispatch(failure(error.message, mealTypes.MEALS_FAILURE));
      }
    );
};

const updateMeal = (meal, mealId) => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  mealServices.updateMeal(meal, `/api/v1/meals${mealId}`)
    .then(
      updatedMeal => dispatch(success(updatedMeal.data, mealTypes.UPDATE_MEAL_SUCCESS)),
      error => dispatch(failure(error.message, mealTypes.MEALS_FAILURE))
    );
};

export default {
  getAllMeals,
  createMeal,
  updateMeal
};