import {
  menuTypes
} from '../types';

const initialState = {
  connecting: false,
  menuError: null,
  menu: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case menuTypes.MENU_REQUEST:
      return {
        ...state,
        connecting: true,
        menuError: null
      };
    case menuTypes.GET_MENU_SUCCESS:
      return {
        menu: action.menu,
      };
    case menuTypes.MENU_FAILURE:
      return {
        ...state,
        connecting: false,
        menuError: action.error
      };
    case menuTypes.POST_MENU_SUCCESS:
      return {
        menu: action.menu,
      };
    default:
      return state;
  }
};