import { allMeals } from './mealDataMock';

const Meals = allMeals.data.map(meal => ({ ...meal, MealOrders: { quantity: 2 } }));
export const order = {
  data: { id: 'orderId',
    userId: 'userId',
    Meals,
    mealList: ['abc', 'def'],
    quantityList: [2, 2] }
};
export const allOrders = {
  data: [{ ...order.data, id: 'order1' }, { ...order.data, id: 'order2' }]
};