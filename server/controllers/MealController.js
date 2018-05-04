import Meal from '../models/meal';

const MealController = {
  createMeal(req, res) {
    const { name, price, image } = req.body;
    if (!name || (/^ *$/.test(name) === true) || typeof name !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid meal name' });
    } else if (!price || isNaN(price) === true || (/^ *$/.test(price) === true)) {
      return res.status(400).send({ message: 'Please provide a valid meal price' });
    } else if (typeof image !== 'string' || (/^ *$/.test(image) === true)) {
      return res.status(400).send({ message: 'Please provide a valid image URL' });
    }
    return models.meal
      .create({ name, price, image })
      .then((meal) => {
        return res.status(201).send({ message: 'New meal added successfully', data: meal });
      })
      .catch((err) => {
        return res.status(400).send({ message: err.errors[0].message });
      });
  },
//   getAllMeal(req, res) {
//     const allMeal = Meal.findAll();
//     return res.status(200).send({ data: allMeal });
//   },
//   modifyOneMeal(req, res) {
//     const { id } = req.params;
//     const { name, price, image } = req.body;

//     if (isNaN(id)) {
//       return res.status(404).send({ message: 'Provide a valid meal id' });
//     }
//     if (!name && !price && !image ) {
//       res.status(404).send({ message: 'Meal not found' });
//     }
//     if (!name || (/^ *$/.test(name) === true) || typeof name !== 'string') {
//       return res.status(400).send({ message: 'Please check your meal name' });
//     }
//     if (!price || isNaN(price) === true) {
//       return res.status(400).send({ message: 'Please provide a valid meal price' });
//     }
//     if (!image || (/^ *$/.test(image) === true) || typeof image !== 'string') {
//       return res.status(400).send({ message: 'Please provide a valid image URL' });
//     }
//     const updatedMeal = Meal.update(id, req);

//     return res.status(200).send({ message: 'Meal updated successfully', data: updatedMeal });
//   },
//   deleteOneMeal(req, res) {
//     const { id } = req.params;

//     if (isNaN(id)) {
//       return res.status(404).send({ message: 'Provide a valid meal id' });
//     }

//     const deletedMeal = Meal.delete(id);
//     if (deletedMeal === false) {
//       return res.status(404).send({ message: 'Meal not found' });
//     }

//     return res.status(200).send({ message: 'Meal deleted successfully', data: deletedMeal });
};

export default MealController;
