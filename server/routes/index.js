import MealController from '../controllers/MealController';
import MenuController from '../controllers/MenuController';

const routes = (app) => {
  app
    .post('/api/v1/meals', MealController.addOneMeal)
    .get('/api/v1/meals', MealController.getAllMeal)
    .put('/api/v1/meals/:id', MealController.modifyOneMeal)
    .delete('/api/v1/meals/:id', MealController.deleteOneMeal);
  app
    .post('/api/v1/menu', MenuController.createMenu);
};

export default routes;