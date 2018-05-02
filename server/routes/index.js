import MealController from '../controllers/MealController';
import MenuController from '../controllers/MenuController';
import MealOrderController from '../controllers/MealOrderController';
import UserController from '../controllers/UserController';

const routes = (app) => {
  // Meal routes
  app.post('/api/v1/meals', MealController.createMeal);
  app.get('/api/v1/meals', MealController.getAllMeal);
  app.put('/api/v1/meals/:id', MealController.modifyOneMeal);
  app.delete('/api/v1/meals/:id', MealController.deleteOneMeal);

  // Menu routes
  app.put('/api/v1/menu/:id', MenuController.createMenu);
  app.get('/api/v1/menu', MenuController.getMenu);

  // Meal Order routes
  app.post('/api/v1/order/:mealId', MealOrderController.placeOrder);
  app.get('/api/v1/order', MealOrderController.getAllOrder);
  app.put('/api/v1/order/:id', MealOrderController.modifyOrderMade);

  // User route
  app.post('/api/v1/user/signup', UserController.addUser);
  app.post('/api/v1/user/signin', UserController.logInUser);
};

export default routes;
