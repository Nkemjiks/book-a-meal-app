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
  roleUpdateValidation,
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
    roleUpdateValidation,
    userController.updateUserRole,
  );
  app.post('/auth/token', verifyToken, userController.refreshToken);

  // Meal routes
  app.post(
    '/meals',
    verifyToken,
    checkUserRole,
    addMealValidation,
    mealController.createMeal,
  );
  app.get(
    '/meals',
    verifyToken,
    checkUserRole,
    mealController.getAllCatererMeal,
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
    '/menu',
    verifyToken,
    checkUserRole,
    menuMealsValidation,
    checkValidMealId,
    menuController.createMenu,
  );
  app.get(
    '/menu/caterer',
    verifyToken,
    checkUserRole,
    menuController.getCatererMenu,
  );
  app.get('/menu/:offset', menuController.getAvailableMenu);
  app.get('/menu/meal/:id', menuController.getMealsInMenu);

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
    '/orders/caterer/all',
    verifyToken,
    checkUserRole,
    orderController.getAllCatererOrder,
  );
  app.get(
    '/orders/customer',
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

  // API docs
  app.get('/docs', (res) => {
    return res.redirect('https://bookameal24.docs.apiary.io/#');
  });
};

export default routes;
