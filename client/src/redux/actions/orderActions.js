import {
  orderTypes
} from '../types';
import requestServices from '../../services/requestServices';

const baseUrl = '/api/v1/orders';
const request = actionType => ({
  type: actionType,
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const getAllOrders = () => (dispatch) => {
  dispatch(request(orderTypes.ORDER_REQUEST));

  requestServices.noSend(baseUrl)
    .then(
      response =>
        dispatch({
          type: orderTypes.GET_ORDER_ALL_SUCCESS,
          orders: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, orderTypes.ORDER_FAILURE))

    );
};

const getUserOrdersByDate = date => (dispatch) => {
  const url = date ? `${baseUrl}/user/${date}` : `${baseUrl}/user/`;
  dispatch(request(orderTypes.ORDER_REQUEST));
  requestServices.noSend(url)
    .then(
      response =>
        dispatch({
          type: orderTypes.GET_ORDER_ALL_SUCCESS,
          orders: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, orderTypes.ORDER_FAILURE))

    );
};
const getOrdersByDate = date => (dispatch) => {
  const url = date ? `${baseUrl}/all/${date}` : `${baseUrl}/all/`;
  dispatch(request(orderTypes.ORDER_REQUEST));
  requestServices.noSend(url)
    .then(
      response =>
        dispatch({
          type: orderTypes.GET_ORDER_ALL_SUCCESS,
          orders: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, orderTypes.ORDER_FAILURE))

    );
};

const postOrder = order => (dispatch) => {
  dispatch(request(orderTypes.ORDER_REQUEST));

  requestServices.send(baseUrl, 'post', order)
    .then(
      response =>
        dispatch({
          type: orderTypes.POST_ORDER_SUCCESS,
          order: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, orderTypes.ORDER_FAILURE))

    );
};

const updateOrder = (order, orderId) => (dispatch) => {
  dispatch(request(orderTypes.ORDER_REQUEST));

  requestServices.send(`${baseUrl}/${orderId}`, 'put', order)
    .then(
      response =>
        dispatch({
          type: orderTypes.UPDATE_ORDER_SUCCESS,
          order: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, orderTypes.ORDER_FAILURE))

    );
};

export default {
  getAllOrders,
  getUserOrdersByDate,
  getOrdersByDate,
  postOrder,
  updateOrder
};