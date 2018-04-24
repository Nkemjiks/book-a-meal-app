import fs from 'fs';
import path from 'path';
import Meal from '../models/meals';

const MealController = {
  addOneMeal(req, res) {
    const data = fs.readFileSync(path.join(`${__dirname}/../database/mealDatabase.json`));
    const meal = JSON.parse(data);
    const newMeal = new Meal(
      req.body.id,
      req.body.name,
      req.body.price,
      req.body.image,
      req.body.isChecked,
    );
    const filter = meal.data.filter(checkName => checkName.name === req.body.name);
    if (filter === []) {
      meal.data.push(newMeal);
      const mealDataUpdate = JSON.stringify(meal, null, 2);
      return fs.writeFile(path.join(`${__dirname}/../database/mealDatabase.json`), mealDataUpdate, (err) => {
        if (err) {
          return res.status(400).send({ message: 'Meal not added successfully' });
        }
        return res.status(200).send(newMeal);
      });
    }
    return res.status(200).send({ message: 'Meal already exist' });
  },
  getAllMeal(req, res) {
    fs.readFile(path.join(`${__dirname}/../database/mealDatabase.json`), (err, data) => {
      const meal = JSON.parse(data);
      if (err) {
        return res.status(400).send({ message: 'Database not found' });
      }
      return res.status(200).send(meal);
    });
  },
};

export default MealController;
