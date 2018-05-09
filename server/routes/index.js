import mealController from '../controllers/mealController';
import menuController from '../controllers/menuController';
import orderController from '../controllers/orderController';
import userController from '../controllers/userController';

// Middleware
import { checkUserRole, checkAuthenticatedUser } from '../common/middlewares';

const routes = (app) => {
  // Meal routes
  app.post('/meals/', checkUserRole, mealController.createMeal);
  app.get('/meals/', checkUserRole, mealController.getAllCatererMeal);
  app.put('/meals/:id', checkUserRole, mealController.modifyMeal);
  app.delete('/meals/:id', checkUserRole, mealController.deleteMeal);

  // Menu routes
  app.post('/menu/', checkUserRole, menuController.createMenu);
  app.get('/menu/caterer', checkAuthenticatedUser, menuController.getCatererMenu);
  app.get('/menu/', menuController.getAllMenu);

  // // Meal Order routes
  app.post('/order', checkAuthenticatedUser, orderController.makeOrder);
  app.get('/order', checkAuthenticatedUser, orderController.getOrder);
  app.put('/order/:id', checkAuthenticatedUser, orderController.modifyOrder);

  // User route
  app.post('/auth/signup', userController.addUser);
  app.post('/auth/login', userController.logInUser);
  app.put('/auth/:id', userController.updateUserRole);
};

export default routes;
