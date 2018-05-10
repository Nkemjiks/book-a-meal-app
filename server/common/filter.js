const filterUserDetail = user => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  address: user.address,
});

const filterMenuDetails = menu => ({
  id: menu.id,
  date: menu.date,
  catererId: menu.userId,
  meals: menu.meals,
  caterer: menu.user,
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
  filterUserDetail,
  filterMenuDetails,
};
