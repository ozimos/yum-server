import {
  mealTypes
} from '../types';
import mealServices from '../../services/mealServices';

const request = actionType => ({
  type: actionType,
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const getAllMeals = () => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  mealServices.getAllMeals('/api/v1/meals')
    .then(
      meals =>
        dispatch({
          type: mealTypes.ALL_MEALS_SUCCESS,
          meals: meals.data
        }),
      error =>
        dispatch(failure(error.message, mealTypes.MEALS_FAILURE))

    );
};


const createMeal = meal => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  mealServices.createMeal(meal, '/api/v1/meals')
    .then(
      createdMeal =>
        dispatch({
          type: mealTypes.CREATE_MEAL_SUCCESS,
          meal: createdMeal.data
        }),
      error =>
        dispatch(failure(error.message, mealTypes.MEALS_FAILURE))

    );
};

const updateMeal = (meal, mealId) => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  mealServices.updateMeal(meal, `/api/v1/meals${mealId}`)
    .then(
      updatedMeal =>
        dispatch({
          type: mealTypes.UPDATE_MEAL_SUCCESS,
          meal: updatedMeal.data
        }),
      error => dispatch(failure(error.message, mealTypes.MEALS_FAILURE))
    );
};

const deleteMeal = mealId => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  mealServices.deleteMeal(`/api/v1/meals${mealId}`)
    .then(
      deletedMeal =>
        dispatch({
          type: mealTypes.DELETE_MEAL_SUCCESS,
          deleted: deletedMeal.data
        }),
      error => dispatch(failure(error.message, mealTypes.MEALS_FAILURE))
    );
};

export default {
  getAllMeals,
  createMeal,
  updateMeal,
  deleteMeal
};