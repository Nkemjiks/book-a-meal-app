import MealController from '../controllers/MealController';

const routes = (app) => {
  app
    .post('/api/v1/meals', MealController.addOneMeal)
    .get('/api/v1/meals', MealController.getAllMeal)
    .put('/api/v1/meals/:id', MealController.modifyOneMeal)
    .delete('/api/v1/meals/:id', MealController.deleteOneMeal);
};

export default routes;
