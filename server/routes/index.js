import MealController from '../controllers/MealController';

const routes = (app) => {
  app.post('/api/v1/meals', MealController.addOneMeal);
  app.get('/api/v1/meals', MealController.getAllMeal);
  app.put('/api/v1/meals/:id', MealController.modifyOneMeal);
};

export default routes;
