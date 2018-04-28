import MealController from '../controllers/MealController';
import MenuController from '../controllers/MenuController';
import MealOrderController from '../controllers/MealOrderController';
import UserController from '../controllers/UserController';

const routes = (app) => {
  // Meal routes
  app
    .post('/api/v1/meals', MealController.addOneMeal)
    .get('/api/v1/meals', MealController.getAllMeal)
    .put('/api/v1/meals/:id', MealController.modifyOneMeal)
    .delete('/api/v1/meals/:id', MealController.deleteOneMeal);

  // Menu routes
  app
    .post('/api/v1/menu', MenuController.createMenu)
    .get('/api/v1/menu', MenuController.getMenu);

  // Meal Order routes
  app
    .post('/api/v1/order', MealOrderController.makeOrder)
    .get('/api/v1/order', MealOrderController.getAllOrder)
    .put('/api/v1/order/:id', MealOrderController.modifyOrderMade);

  // User route
  app
    .post('/api/v1/user', UserController.addUser);
};

export default routes;
