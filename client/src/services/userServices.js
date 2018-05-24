import authHeader from '../authHeader';

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.message);
  }

  return response.json();
}

function login(email, password, url) {
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
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function getAll(url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(url, requestOptions).then(handleResponse);
}


function signUp(user, url) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  };

  return fetch(url, requestOptions).then(handleResponse);
}

export default {
  login,
  logout,
  signUp,
  getAll,
};