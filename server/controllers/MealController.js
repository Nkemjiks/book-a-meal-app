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
    meal.data.push(newMeal);
    const mealDataUpdate = JSON.stringify(meal, null, 2);
    return fs.writeFile(path.join(`${__dirname}/../database/mealDatabase.json`), mealDataUpdate, (err) => {
      if (err) {
        return res.status(400).send({ message: 'Meal not added successfully' });
      }
      return res.status(200).send('Save completed');
    });
  },
};

export default MealController;
