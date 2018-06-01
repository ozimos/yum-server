import authHeader from '../authHeader';

const processResponse = response => new Promise((resolve, reject) => {
  const func = response.status < 400 ? resolve : reject;
  return response.json().then(data => func(data));
});
const login = (userData, url) => {

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  };

  return fetch(url, requestOptions)
    .then(processResponse)
    .then((user) => {
      if (user && user.token) {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
};

const logout = () => {
  // remove user from local storage to log user out
  sessionStorage.removeItem('user');
};

const getAll = (url) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(url, requestOptions).then(processResponse);
};


const signUp = (newUser, url) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  };

  return fetch(url, requestOptions).then(processResponse)
    .then((user) => {
      if (user && user.token) {
        sessionStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
};

export default {
  login,
  logout,
  signUp,
  getAll,
};