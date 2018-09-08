import { userIncludes } from './userDataMock';

export const orderMeals = [
  { id: 'meal1',
    price: 1200,
    quantity: 2,
    title: 'Eba and Egusi',
  },
  { id: 'meal2',
    price: 2000,
    quantity: 2,
    title: 'Rice and Stew',
  }
];

const Meals = orderMeals.map(meal =>
  ({ ...meal, MealOrders: { quantity: 2 } }));

const template = {
  id: 'order1',
  updatedAt: '2018-08-24T16:47:55.783Z',
  userId: 'userId',
  Meals,
  User: userIncludes,
};
export const order = {
  data: {
    limit: 1,
    offset: 0,
    rows: [template]
  }
};

export const orderActionData = {
  order: template

};

export const allOrders = {
  data: {
    rows: [{ ...template, id: 'order1' },
      { ...template, id: 'order2' }] }
};
