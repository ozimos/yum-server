import axios from 'axios';
import authHeader from '../authHeader';

const send = (url, method, menuData) => {
  const requestOptions = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...authHeader()
    },
    data: menuData
  };
  return axios(requestOptions);
};

const noSend = (url) => {
  const requestOptions = {
    url,
    headers: {
      Accept: 'application/json',
      ...authHeader()
    },
  };
  return axios(requestOptions);
};

export default {
  send,
  noSend
};