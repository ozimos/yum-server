import axios from 'axios';

const fetchApi = () => (dispatch) => {
  dispatch({
    type: 'GET_PHOTOS'
  });
  axios.get('https://jsonplaceholder.typicode.com/photos')
    .then((response) => {
      if (response) {
        dispatch({
          type: 'GET_PHOTOS_SUCCESSFUL',
          payload: response.data
        });
      }
    }).catch((err) => {
      if (err.response) {
        dispatch({
          type: 'FAILED',
          payload: err.response.data
        });
      }
    });
};
export default fetchApi;