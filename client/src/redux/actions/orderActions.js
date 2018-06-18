import {
  orderTypes
} from '../types';
import orderServices from '../../services/orderServices';

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

  orderServices.getAllOrders(baseUrl)
    .then(
      order =>
        dispatch({
          type: orderTypes.GET_ORDER_ALL_SUCCESS,
          orders: order.data
        }),
      error =>
        dispatch(failure(error.message, orderTypes.ORDER_FAILURE))

    );
};

const getUserOrdersByDate = date => (dispatch) => {
  const url = date ? `${baseUrl}/user/${date}` : `${baseUrl}/user/`;
  dispatch(request(orderTypes.ORDER_REQUEST));
  orderServices.get(url)
    .then(
      order =>
        dispatch({
          type: orderTypes.GET_ORDER_ALL_SUCCESS,
          orders: order.data
        }),
      error =>
        dispatch(failure(error.message, orderTypes.ORDER_FAILURE))

    );
};
const getOrdersByDate = date => (dispatch) => {
  const url = date ? `${baseUrl}/all/${date}` : `${baseUrl}/all/`;
  dispatch(request(orderTypes.ORDER_REQUEST));
  orderServices.get(url)
    .then(
      order =>
        dispatch({
          type: orderTypes.GET_ORDER_ALL_SUCCESS,
          orders: order.data
        }),
      error =>
        dispatch(failure(error.message, orderTypes.ORDER_FAILURE))

    );
};

const postOrder = order => (dispatch) => {
  dispatch(request(orderTypes.ORDER_REQUEST));

  orderServices.postOrder(order, baseUrl)
    .then(
      postedOrder =>
        dispatch({
          type: orderTypes.POST_ORDER_SUCCESS,
          order: postedOrder.data
        }),
      error =>
        dispatch(failure(error.message, orderTypes.ORDER_FAILURE))

    );
};

const updateOrder = (order, orderId) => (dispatch) => {
  dispatch(request(orderTypes.ORDER_REQUEST));

  orderServices.updateOrder(order, `${baseUrl}/${orderId}`)
    .then(
      updatedOrder =>
        dispatch({
          type: orderTypes.UPDATE_ORDER_SUCCESS,
          order: updatedOrder.data
        }),
      error =>
        dispatch(failure(error.message, orderTypes.ORDER_FAILURE))

    );
};

export default {
  getAllOrders,
  getUserOrdersByDate,
  getOrdersByDate,
  postOrder,
  updateOrder
};