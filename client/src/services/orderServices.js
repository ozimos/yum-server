import authHeader from '../authHeader';

const processResponse = response => new Promise((resolve, reject) => {
  const func = response.status < 400 ? resolve : reject;
  return response.json().then(data => func(data));
});
const postOrder = (orderData, url) => {

  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  };

  return fetch(url, requestOptions)
    .then(processResponse);
};

const getAllOrders = (url) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(url, requestOptions).then(processResponse);
};
const get = (url) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(url, requestOptions).then(processResponse);
};
const updateOrder = (orderData, url) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData),
  };

  return fetch(url, requestOptions).then(processResponse);
};

export default {
  getAllOrders,
  get,
  postOrder,
  updateOrder
};