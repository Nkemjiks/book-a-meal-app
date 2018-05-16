import mealController from '../controllers/mealController';
import menuController from '../controllers/menuController';
import orderController from '../controllers/orderController';
import userController from '../controllers/userController';

// Import Middleware
import {
  checkUserRole,
  checkAuthenticatedUser,
  checkValidMealId,
} from '../helpers/middlewares';

// Import Validations
import {
  signupValidation,
  signInValidation,
  addMealValidation,
  modifyMealValidation,
  menuMealsValidation,
  orderValidation,
} from '../helpers/validation';

// Import Token Verification
import { verifyToken } from '../helpers/token';

const routes = (app) => {
  // User route
  app.post('/auth/signup', signupValidation, userController.addUser);
  app.post('/auth/login', signInValidation, userController.logInUser);
  app.put(
    '/auth/update',
    verifyToken,
    checkAuthenticatedUser,
    userController.updateUserRole,
  );

  // Meal routes
  app.post(
    '/meals/',
    verifyToken,
    checkUserRole,
    addMealValidation,
    mealController.createMeal,
  );
  app.get(
    '/meals/caterer',
    verifyToken,
    checkUserRole,
    mealController.getAllCatererMeal,
  );
  app.get(
    '/meals/',
    verifyToken,
    checkAuthenticatedUser,
    mealController.getAllMeal,
  );
  app.put(
    '/meals/:id',
    verifyToken,
    checkUserRole,
    modifyMealValidation,
    mealController.modifyMeal,
  );
  app.delete(
    '/meals/:id',
    verifyToken,
    checkUserRole,
    mealController.deleteMeal,
  );

  // Menu routes
  app.post(
    '/menu/',
    verifyToken,
    checkUserRole,
    menuMealsValidation,
    checkValidMealId,
    menuController.createMenu,
  );
  app.get(
    '/menu/caterer',
    verifyToken,
    checkAuthenticatedUser,
    menuController.getCatererMenu,
  );
  app.get('/menu/', menuController.getAllMenu);
  app.delete(
    '/menu/',
    verifyToken,
    checkUserRole,
    menuMealsValidation,
    checkValidMealId,
    menuController.removeMealFromMenu,
  );

  // Meal Order routes
  app.post(
    '/orders',
    verifyToken,
    checkAuthenticatedUser,
    orderValidation,
    orderController.placeOrder,
  );
  app.get(
    '/orders/caterer',
    verifyToken,
    checkUserRole,
    orderController.getCatererOrder,
  );
  app.get(
    '/orders',
    verifyToken,
    checkAuthenticatedUser,
    orderController.getCustomerOrder,
  );
  app.put(
    '/orders/:id',
    verifyToken,
    checkAuthenticatedUser,
    orderValidation,
    orderController.modifyOrder,
  );
  app.delete(
    '/orders/:id',
    verifyToken,
    checkAuthenticatedUser,
    orderController.cancelOrder,
  );
};

export default routes;
