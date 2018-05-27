import authHeader from '../authHeader';

const handleResponse = (response) => {
  if (!response.ok) {
    return Promise.reject(response.message);
  }

  return response.json();
};

const login = (email, password, url) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  };

  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response.message);
      }

      return response.json();
    })
    .then((user) => {
      if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      return user;
    });
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const getAll = (url) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(url, requestOptions).then(handleResponse);
};


const signUp = (newUser, url) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  };

  return fetch(url, requestOptions).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.message);
    }

    return response.json();
  })
    .then((user) => {
      if (user && user.token) {
        localStorage.setItem('user', JSON.stringify(user));
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