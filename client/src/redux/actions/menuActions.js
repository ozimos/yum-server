import {
  menuTypes
} from '../types';
import menuServices from '../../services/menuServices';

const request = actionType => ({
  type: actionType,
});
const failure = (error, actionType) => ({
  type: actionType,
  error
});

const getMenu = () => (dispatch) => {
  dispatch(request(menuTypes.MENU_REQUEST));

  menuServices.getMenu('/api/v1/menu')
    .then(
      menu =>
        dispatch({
          type: menuTypes.GET_MENU_SUCCESS,
          menu: menu.data
        }),
      error =>
        dispatch(failure(error.message, menuTypes.MENU_FAILURE))

    );
};


const postMenu = menu => (dispatch) => {
  dispatch(request(menuTypes.MENU_REQUEST));

  menuServices.postMenu(menu, '/api/v1/menu')
    .then(
      postedMenu =>
        dispatch({
          type: menuTypes.POST_MENU_SUCCESS,
          menu: postedMenu.data
        }),
      error =>
        dispatch(failure(error.message, menuTypes.MENU_FAILURE))

    );
};


export default {
  getMenu,
  postMenu,
};