import {
  mealTypes
} from '../types';
import requestServices from '../../services/requestServices';

const request = actionType => ({
  type: actionType,
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const getAllMeals = () => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  return requestServices.noSend('/api/v1/meals')
    .then(
      response =>
        dispatch({
          type: mealTypes.ALL_MEALS_SUCCESS,
          meals: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, mealTypes.MEALS_FAILURE))
    );
};
const getAllUserMeals = () => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  return requestServices.noSend('/api/v1/meals/user')
    .then(
      response =>
        dispatch({
          type: mealTypes.ALL_MEALS_SUCCESS,
          meals: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, mealTypes.MEALS_FAILURE))
    );
};

const createMeal = meal => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  return requestServices.send('/api/v1/meals', 'post', meal)
    .then(
      response =>
        dispatch({
          type: mealTypes.CREATE_MEAL_SUCCESS,
          meal: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, mealTypes.MEALS_FAILURE))

    );
};

const updateMeal = (meal, mealId) => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  return requestServices.send(`/api/v1/meals/${mealId}`, 'put', meal)
    .then(
      response =>
        dispatch({
          type: mealTypes.UPDATE_MEAL_SUCCESS,
          meal: response.data.data
        }),
      error => dispatch(failure(
        error.response.data.message,
        mealTypes.MEALS_FAILURE
      ))
    );
};

const deleteMeal = mealId => (dispatch) => {
  dispatch(request(mealTypes.MEALS_REQUEST));

  return requestServices.noSend(`/api/v1/meals/${mealId}`, 'delete')
    .then(
      (response) => {
        if (response.data.data) {
          return dispatch({
            type: mealTypes.DELETE_MEAL_SUCCESS,
            id: mealId
          });
        }
      },
      error => dispatch(failure(
        error.response.data.message,
        mealTypes.MEALS_FAILURE
      ))
    );
};

export default {
  getAllMeals,
  getAllUserMeals,
  createMeal,
  updateMeal,
  deleteMeal
};
