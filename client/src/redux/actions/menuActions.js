import {
  menuTypes
} from '../types';
import requestServices from '../../services/requestServices';

const request = actionType => ({
  type: actionType,
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const getMenu = () => (dispatch) => {
  dispatch(request(menuTypes.MENU_REQUEST));

  return requestServices.noSend('/api/v1/menu')
    .then(
      response =>
        dispatch({
          type: menuTypes.GET_MENU_SUCCESS,
          menu: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, menuTypes.MENU_FAILURE))

    );
};


const postMenu = menu => (dispatch) => {
  dispatch(request(menuTypes.MENU_REQUEST));

  return requestServices.send('/api/v1/menu', 'post', menu)
    .then(
      response =>
        dispatch({
          type: menuTypes.POST_MENU_SUCCESS,
          menu: response.data.data
        }),
      error =>
        dispatch(failure(error.response.data.message, menuTypes.MENU_FAILURE))

    );
};


export default {
  getMenu,
  postMenu,
};