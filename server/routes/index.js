import MealController from '../controllers/MealController';

const routes = (app) => {
  app.use((req, res, next) => {
    console.log(req.body, req.method, req.url);
    next();
  });

  app
    .post('/api/v1/meals', MealController.addOneMeal)
    .get('/api/v1/meals', MealController.getAllMeal);
};

export default routes;
