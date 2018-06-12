import {
  orderTypes
} from '../types';
import orderServices from '../../services/orderServices';

const request = actionType => ({
  type: actionType,
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const getAllOrders = () => (dispatch) => {
  dispatch(request(orderTypes.ORDER_REQUEST));

  orderServices.getAllOrders('/api/v1/orders')
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

  orderServices.postOrder(order, '/api/v1/orders')
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

  orderServices.updateOrder(order, `/api/v1/orders/${orderId}`)
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
  postOrder,
  updateOrder
};