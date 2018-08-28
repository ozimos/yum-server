import { userIncludes } from './userDataMock';

const rows = [
  { id: 'abc', price: 1200 }, { id: 'def', price: 2000 }
];
const Meals = rows.map(meal =>
  ({ ...meal, MealOrders: { quantity: 2 } }));
const template = {
  id: 'orderId',
  userId: 'userId',
  Meals,
  User: userIncludes,
};
export const order = {
  data: {
    pages: 1,
    offset: 0,
    rows: [template]
  }
};
export const orderActionData = {
  order: template

};
export const allOrders = {
  data: [{ ...template, id: 'order1' }, { ...template, id: 'order2' }]
};
