import mealController from '../controllers/mealController';
import menuController from '../controllers/menuController';
import orderController from '../controllers/orderController';
import userController from '../controllers/userController';

// Middleware
import { checkUserRole, checkAuthenticatedUser } from '../common/middlewares';

const routes = (app) => {
  // Meal routes
  app.post('/meals/', checkUserRole, mealController.createMeal);
  app.get('/meals/caterer', checkUserRole, mealController.getAllCatererMeal);
  app.get('/meals/', checkAuthenticatedUser, mealController.getAllMeal);
  app.put('/meals/:id', checkUserRole, mealController.modifyMeal);
  app.delete('/meals/:id', checkUserRole, mealController.deleteMeal);

  // Menu routes
  app.post('/menu/', checkUserRole, menuController.createMenu);
  app.get('/menu/caterer', checkAuthenticatedUser, menuController.getCatererMenu);
  app.get('/menu/', menuController.getAllMenu);

  // // Meal Order routes
  app.post('/orders', checkAuthenticatedUser, orderController.makeOrder);
  app.get('/orders', checkUserRole, orderController.getOrder);
  app.put('/orders/:id', checkAuthenticatedUser, orderController.modifyOrder);

  // User route
  app.post('/auth/signup', userController.addUser);
  app.post('/auth/login', userController.logInUser);
  app.put('/auth/', checkAuthenticatedUser, userController.updateUserRole);
};

export default routes;
