import {
  alertTypes
} from '../types';

export default {
  success(message) {
    return {
      type: alertTypes.SUCCESS,
      message
    };
  },
  error(message) {
    return {
      type: alertTypes.ERROR,
      message
    };
  },
  clear() {
    return {
      type: alertTypes.CLEAR
    };
  }
};