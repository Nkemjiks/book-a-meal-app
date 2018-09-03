// Filter the user details that are returned after signing up
const filterUserDetail = user => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phoneNumber: user.phoneNumber,
  role: user.role,
  address: user.address,
  businessName: user.businessName,
  logoURL: user.logoURL,
  businessAddress: user.businessAddress,
});

const filterUserDetailForToken = user => ({
  id: user.id,
  email: user.email,
  role: user.role,
});

const filterCaterermenu = (menu) => {
  const meals = [];
  for (let i = 0; i < menu.meals.length; i += 1) {
    meals.push({
      name: menu.meals[i].name,
      imageURL: menu.meals[i].imageURL,
      price: menu.meals[i].price,
      mealId: menu.meals[i].menuItems.mealId,
    });
  }
  return ({
    id: menu.id,
    date: menu.date,
    userId: menu.userId,
    createdAt: menu.createdAt,
    updatedAt: menu.updatedAt,
    meals,
  });
};

const filterCreateCaterermenu = (menu) => {
  const meals = [];
  for (let i = 0; i < menu.length; i += 1) {
    meals.push(menu[i].id);
  }
  return ({
    meals,
  });
};

const filterCatererOrders = (order) => {
  const orders = [];
  for (const orderDetails of order) {
    const meals = [];
    for (const meal of orderDetails.meals) {
      meals.push({
        id: meal.id,
        name: meal.name,
        imageURL: meal.imageURL,
        price: meal.price,
        isDeleted: meal.isDeleted,
        quantity: meal.orderItems.quantity,
        mealId: meal.orderItems.mealId,
      });
    }
    orders.push({
      id: orderDetails.id,
      date: orderDetails.date,
      time: orderDetails.time,
      userId: orderDetails.userId,
      deliveryAddress: orderDetails.deliveryAddress,
      isDeleted: orderDetails.isDeleted,
      createdAt: orderDetails.createdAt,
      updatedAt: orderDetails.updatedAt,
      meals,
      user: orderDetails.user,
    });
  }
  return orders;
};

const filterPlaceOrder = (order, meal) => {
  const mealIds = [];
  for (let i = 0; i < meal.length; i += 1) {
    mealIds.push({ mealId: meal[i].id, quantity: meal[i].orderItems.quantity });
  }
  return ({
    id: order.id,
    date: order.date,
    time: order.time,
    userId: order.userId,
    deliveryAddress: order.deliveryAddress,
    isDeleted: order.isDeleted,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    mealIds,
  });
};

const filterMealinMenu = (meals) => {
  const mealsInMenu = [];
  for (let i = 0; i < meals.length; i += 1) {
    mealsInMenu.push({
      name: meals[i].name,
      imageURL: meals[i].imageURL,
      price: meals[i].price,
      mealId: meals[i].menuItems.mealId,
      menuId: meals[i].menuItems.menuId,
    });
  }
  return mealsInMenu;
};

// Filter the menu details that is displayed to users
const filterMenuDetails = menu => ({
  id: menu.id,
  date: menu.date,
  catererId: menu.userId,
  caterer: menu.user,
});

export {
  filterUserDetail,
  filterMenuDetails,
  filterUserDetailForToken,
  filterCaterermenu,
  filterMealinMenu,
  filterCatererOrders,
  filterCreateCaterermenu,
  filterPlaceOrder,
};
