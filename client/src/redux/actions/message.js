import SET_MESSAGE from '../types/message';

const setMessage = message => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    payload: {
      message
    }
  });
};
export default setMessage;