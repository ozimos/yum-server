import {
  dashboardTypes
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

const getOrdersByDate = date => (dispatch) => {
  const url = date ? `${baseUrl}/all/${date}` : `${baseUrl}/all/`;
  dispatch(request(dashboardTypes.ORDER_DASHBOARD_REQUEST));
  return requestServices.noSend(url)
    .then(
      response =>
        dispatch({
          type: dashboardTypes.GET_ORDER_DASHBOARD_SUCCESS,
          orders: response.data.data
        }),
      error =>
        dispatch(failure(
          error.response.data.message,
          dashboardTypes.ORDER_DASHBOARD_FAILURE
        ))

    );
};

export default {
  getOrdersByDate,
};
