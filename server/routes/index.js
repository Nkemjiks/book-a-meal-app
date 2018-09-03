import mealController from '../controllers/mealController';
import menuController from '../controllers/menuController';
import orderController from '../controllers/orderController';
import userController from '../controllers/userController';

// Import Middleware
import {
  checkUserRole,
  checkAuthenticatedUser,
  checkValidMealIds,
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
  idValidation,
  limitOffsetValidation,
  catererIdValidation,
} from '../helpers/validation';

// Import Token Verification
import { verifyToken } from '../helpers/token';

const routes = (app) => {
  // User route
  app.post(
    '/auth/signup',
    signupValidation,
    userController.addUser,
  );
  app.post(
    '/auth/login',
    signInValidation,
    userController.logInUser,
  );
  app.put(
    '/auth/update',
    verifyToken,
    checkAuthenticatedUser,
    roleUpdateValidation,
    userController.updateUserRole,
  );
  app.post(
    '/auth/token',
    verifyToken,
    userController.refreshToken,
  );

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
    idValidation,
    modifyMealValidation,
    mealController.modifyMeal,
  );
  app.delete(
    '/meals/:id',
    verifyToken,
    checkUserRole,
    idValidation,
    mealController.deleteMeal,
  );

  // Menu routes
  app.post(
    '/menu',
    verifyToken,
    checkUserRole,
    menuMealsValidation,
    checkValidMealIds,
    menuController.createMenu,
  );
  app.get(
    '/menu/caterer',
    verifyToken,
    checkUserRole,
    menuController.getCatererMenu,
  );
  app.put(
    '/menu/:id',
    verifyToken,
    checkUserRole,
    idValidation,
    checkValidMealId,
    menuController.removeMealFromMenu,
  );
  app.get(
    '/menu/',
    limitOffsetValidation,
    menuController.getAvailableMenu,
  );
  app.get(
    '/menu/meal/:id',
    idValidation,
    menuController.getMealsInMenu,
  );

  // Meal Order routes
  app.post(
    '/orders',
    verifyToken,
    checkAuthenticatedUser,
    orderValidation,
    catererIdValidation,
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
    limitOffsetValidation,
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
    idValidation,
    orderValidation,
    orderController.modifyOrder,
  );

  // API docs
  app.get('/docs', res => res.redirect('https://bookameal24.docs.apiary.io/#'));

  app.use((req, res) => {
    res.status(404).send({ message: 'The resource you are looking for does not exist' });
  });
};

export default routes;
