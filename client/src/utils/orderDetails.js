const mealTitleList = (order) => {
  const listArray = order.Meals.map(meal => meal.title);
  return listArray.join(', ');
};
const mealQuantityList = (order) => {
  const listArray = order.Meals.map(meal => meal.MealOrders.quantity);
  return listArray.join(', ');
};
export default { mealTitleList, mealQuantityList };
