import {
  dashboardTypes
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

const getOrdersByDate = date => (dispatch) => {
  const url = date ? `${baseUrl}/all/${date}` : `${baseUrl}/all/`;
  dispatch(request(dashboardTypes.ORDER_DASHBOARD_REQUEST));
  orderServices.get(url)
    .then(
      order =>
        dispatch({
          type: dashboardTypes.GET_ORDER_DASHBOARD_SUCCESS,
          orders: order.data
        }),
      error =>
        dispatch(failure(error.message, dashboardTypes.ORDER_DASHBOARD_FAILURE))

    );
};

export default {
  getOrdersByDate,
};