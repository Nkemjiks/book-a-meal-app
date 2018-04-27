import fs from 'fs';
import path from 'path';
import Meal from '../models/meals';

const MealController = {
  addOneMeal(req, res) {
    if (req.body === {}) {
      return res.status(204).send({ message: 'No meal content' });
    }
    const data = fs.readFileSync(path.join(`${__dirname}/../database/mealDatabase.json`));
    if (!data.toString()) {
      return res.status(500).send({ message: 'Sever Error' });
    }
    const meal = JSON.parse(data);
    if (req.body.id !== '' && req.body.name !== '' && req.body.price !== '' && req.body.image !== '' && req.body.isChecked !== '') {
      const newMeal = new Meal(
        req.body.id,
        req.body.name,
        req.body.price,
        req.body.image,
        req.body.isChecked,
      );
      const filter = meal.data.filter(checkName => checkName.name === req.body.name);
      if (filter.length === 0) {
        meal.data.push(newMeal);
        const mealDataUpdate = JSON.stringify(meal, null, 2);
        return fs.writeFile(path.join(`${__dirname}/../database/mealDatabase.json`), mealDataUpdate, (err) => {
          if (err) {
            return res.status(400).send({ message: 'Meal not added successfully' });
          }
          return res.status(201).send({ data: newMeal });
        });
      }
      return res.status(409).send({ message: 'Meal already exist' });
    }
    return res.status(206).send({ message: 'Meal creation data is incomplete' });
  },

  getAllMeal(req, res) {
    fs.readFile((path.join(`${__dirname}/../database/mealDatabase.json`)), 'utf8', (err, data) => {
      const meal = JSON.parse(data);
      if (err) {
        return res.status(400).send({ message: 'Getting meals unsuccessful' });
      }
      return res.status(200).send({ data: meal });
    });
  },
  modifyOneMeal(req, res) {
    if ((req.body.constructor === Object) && (Object.keys(req.body).length === 0)) {
      console.log('yeah, i am here');
      return res.status(404).send({});
    }
    const data = fs.readFileSync(path.join(`${__dirname}/../database/mealDatabase.json`));
    const meal = JSON.parse(data);
    const filtered = meal.data.filter(checkProperty => checkProperty.id === req.params.id);
    if (filtered.length === 1) {
      const position = meal.data.indexOf(filtered[0]);
      
      const checkKeys = Object.keys(req.body);
      checkKeys.forEach((dataKey) => {
        meal.data[position][dataKey] = req.body[dataKey];
      });
      const mealDataUpdate = JSON.stringify(meal, null, 2);
      return fs.writeFile(path.join(`${__dirname}/../database/mealDatabase.json`), mealDataUpdate, (err) => {
        if (err) {
          return res.status(400).send({ message: 'Meal not added successfully' });
        }
        return res.status(200).send({ message: 'Meal added successfully' });
      });
    }
  },
  deleteOneMeal(req, res) {
    const data = fs.readFileSync(path.join(`${__dirname}/../database/mealDatabase.json`));
    const meal = JSON.parse(data);
    const filtered = meal.data.filter(checkProperty => checkProperty.id === Number(req.params.id));
    if (filtered.length === 1) {
      const position = meal.data.indexOf(filtered[0]);
      meal.data.splice(position, 1);
      const mealDataUpdate = JSON.stringify(meal, null, 2);
      return fs.writeFile(path.join(`${__dirname}/../database/mealDatabase.json`), mealDataUpdate, (err) => {
        if (err) {
          return res.status(400).send({ message: 'Meal not deleted successfully' });
        }
        return res.status(200).send({ message: 'Meal deleted successfully' });
      });
    }
    return res.status(404).send({ message: 'Meal does not exist' });
  },
};

export default MealController;
