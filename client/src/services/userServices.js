import axios from 'axios';
import authHeader from '../authHeader';

const post = (userData, url) => {

  const requestOptions = {
    url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData
  };
  return axios(requestOptions);
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const getAll = (url) => {
  const requestOptions = {
    url,
    method: 'get',
    headers: authHeader()
  };
  return axios(requestOptions);
};

export default {
  post,
  logout,
  getAll,
};