import { userTypes } from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case userTypes.GETALL_REQUEST:
      return {
        loading: true
      };
    case userTypes.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userTypes.GETALL_FAILURE:
      return {
        error: action.error
      };

    default:
      return state;
  }
};