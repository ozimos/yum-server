import authHeader from '../authHeader';

const processResponse = response => new Promise((resolve, reject) => {
  const func = response.status < 400 ? resolve : reject;
  return response.json().then(data => func(data));
});
const postMenu = (menuData, url) => {

  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(menuData)
  };

  return fetch(url, requestOptions)
    .then(processResponse);
};

const getMenu = (url) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(url, requestOptions).then(processResponse);
};

export default {
  postMenu,
  getMenu
};