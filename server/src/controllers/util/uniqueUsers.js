export default (orders) => {
  const uniqueUsers = new Set();

  orders.forEach(order => uniqueUsers.add(order.userId));
  return uniqueUsers.size;
};

