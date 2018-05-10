const filterOrderDetails = meal => ({
  date: meal.date,
  time: meal.time,
  customerId: meal.customerId,
  mealId: meal.mealId,
  mealname: meal.mealName,
  mealPrice: meal.mealPrice,
  quantity: meal.quantity,
  totalCost: meal.totalCost,
  deliveryAddress: meal.deliveryAddress,
  customerDetails: meal.user,
});

const filterOrderDetail = meal => ({
  date: meal.date,
  time: meal.time,
  customerId: meal.customerId,
  mealId: meal.mealId,
  mealname: meal.mealName,
  mealPrice: meal.mealPrice,
  quantity: meal.quantity,
  totalCost: meal.totalCost,
  deliveryAddress: meal.deliveryAddress,
  customerDetails: meal.user,
});

export {
  filterOrderDetail,
  filterOrderDetails,
};
