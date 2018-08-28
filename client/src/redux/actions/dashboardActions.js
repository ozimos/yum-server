import {
  dashboardTypes
} from '../types';
import requestServices from '../../services/requestServices';
import paginationExtract from '../../utils/paginationExtract';


const baseUrl = '/api/v1/orders';


const getOrdersWithMealLinks = ({ limit = 5, offset = 0 } = {}) =>
  (dispatch) => {
    dispatch({ type: dashboardTypes.ORDER_DASHBOARD_REQUEST });

    return requestServices(`${baseUrl}?limit=${limit}&offset=${offset}`)
      .then(
        response =>
          dispatch({
            type: dashboardTypes.ORDER_DASHBOARD_HISTORY_SUCCESS,
            orders: response.data.data.rows,
            pagination: paginationExtract(response.data.data)
          }),
        error =>
          dispatch({
            type: dashboardTypes.ORDER_DASHBOARD_HISTORY_FAILURE,
            error: error.response.data.message
          })
      );
  };

const getOrdersWithMealLinksByDate
= (date, { limit = 5, offset = 0 } = {}) => (dispatch) => {
  const url = date ? `${baseUrl}/date/${date}?limit=${limit}&offset=${offset}`
    : `${baseUrl}/date/?limit=${limit}&offset=${offset}`;
  dispatch({ type: dashboardTypes.ORDER_DASHBOARD_REQUEST });
  return requestServices(url)
    .then(
      response =>
        dispatch({
          type: dashboardTypes.ORDER_DASHBOARD_SUCCESS,
          orders: response.data.data.rows,
          pagination: paginationExtract(response.data.data)

        }),
      error =>
        dispatch({
          type: dashboardTypes.ORDER_DASHBOARD_FAILURE,
          error: error.response.data.message
        })

    );
};
const getMealsInOrder
= (orderId, { limit = 4, offset = 0 } = {}) => (dispatch) => {
  const url = `${baseUrl}/${orderId}/meals?limit=${limit}&offset=${offset}`;
  dispatch({ type: dashboardTypes.ORDER_MEALS_DASHBOARD_REQUEST,
    order: { id: orderId, connecting: true, mealError: null }
  });
  return requestServices(url)
    .then(
      response => dispatch({
        type: dashboardTypes.ORDER_MEALS_DASHBOARD_SUCCESS,
        order: { ...response.data.data.rows[0],
          pagination: paginationExtract(response.data.data),
          connecting: false
        }
      }),
      error =>
        dispatch({
          type: dashboardTypes.ORDER_MEALS_DASHBOARD_FAILURE,
          order: { id: orderId,
            connecting: false,
            mealError: error.response.data.message }
        })

    );
};


export default {
  getOrdersWithMealLinksByDate,
  getOrdersWithMealLinks,
  getMealsInOrder
};
