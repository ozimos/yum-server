import SET_MESSAGE from '../types/message';

const setMessage = message => (dispatch) => {
  dispatch({
    type: SET_MESSAGE,
    message
  });
};
export default setMessage;