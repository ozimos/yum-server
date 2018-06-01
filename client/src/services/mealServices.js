import authHeader from '../authHeader';

const processResponse = response => new Promise((resolve, reject) => {
  const func = response.status < 400 ? resolve : reject;
  return response.json().then(data => func(data));
});
const postMeal = (mealData, url) => {

  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mealData)
  };

  return fetch(url, requestOptions)
    .then(processResponse);
};

const getAllMeals = (url) => {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(url, requestOptions).then(processResponse);
};


const updateMeal = (mealData, url) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      ...authHeader(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mealData)
  };

  return fetch(url, requestOptions).then(processResponse);
};

export default {
  postMeal,
  updateMeal,
  getAllMeals,
};