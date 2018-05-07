import MealController from '../controllers/MealController';
import MenuController from '../controllers/MenuController';
import MealOrderController from '../controllers/MealOrderController';
import UserController from '../controllers/UserController';

// Middleware
import { checkUserRole, checkAuthenticatedUser } from '../common/middlewares';

const routes = (app) => {
  // Meal routes
  app.post('/api/v1/meals', checkUserRole, MealController.createMeal);
  app.get('/api/v1/meals', checkUserRole, MealController.getAllCatererMeal);
  app.put('/api/v1/meals/:id', checkUserRole, MealController.modifyMeal);
  app.delete('/api/v1/meals/:id', checkUserRole, MealController.deleteMeal);

  // Menu routes
  app.post('/api/v1/menu/:mealId', checkUserRole, MenuController.createMenu);
  app.get('/api/v1/menu/:userId', checkAuthenticatedUser, MenuController.getMenu);

  // // Meal Order routes
  // app.post('/api/v1/cart/:userId/:id', MealOrderController.addOrder);
  app.post('/api/v1/order', MealOrderController.makeOrder);
  app.get('/api/v1/order', MealOrderController.getAllOrder);
  // app.put('/api/v1/order/:id', MealOrderController.modifyOrderMade);

  // User route
  app.post('/api/v1/user/signup', UserController.addUser);
  app.post('/api/v1/user/signin', UserController.logInUser);
  app.put('/api/v1/user/:id', UserController.updateUserRole);
};

export default routes;
