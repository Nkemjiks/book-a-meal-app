import models from '../models';

const MealController = {
  createMeal(req, res) {
    const { name, price, imageURL } = req.body;
    const userId = req.decoded.id;

    if (isNaN(userId)) {
      return res.status(400).send({ message: 'Provide a valid User Id' });
    }

    if (!name || (/^ *$/.test(name) === true) || typeof name !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid meal name' });
    } else if (!price || isNaN(price) === true || (/^ *$/.test(price) === true)) {
      return res.status(400).send({ message: 'Please provide a valid meal price' });
    } else if (typeof imageURL !== 'string' || (/^ *$/.test(imageURL) === true)) {
      return res.status(400).send({ message: 'Please provide a valid image URL' });
    }
    return models.meal
      .create({ name, price, imageURL, userId })
      .then((meal) => {
        return res.status(201).send({ message: 'New meal added successfully', data: meal });
      })
      .catch((err) => {
        return res.status(400).send({ message: err.errors[0].message });
      });
  },
  getAllCatererMeal(req, res) {
    const userId = req.decoded.id;
    return models.meal
      .findAll({
        where: {
          userId,
        },
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You have not added any meal' });
        }
        return res.status(200).send({ data: meal });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Unable to get meals. Try again' });
      });
  },
  modifyMeal(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send({ message: 'Provide a valid meal id' });
    }

    return models.meal
      .findById(id)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'Meal not found' });
        }
        if (meal.userId !== userId) {
          return res.status(401).send({ message: 'You can not modify this meal' });
        }
        return meal
          .update(req.body)
          .then((modifiedMeal) => {
            return res.status(200).send({ data: modifiedMeal })
          })
          .catch((err) => {
            return res.status(400).send({ message: err.errors[0].message });
          });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Unable to modify meal. Try again' });
      });
  },
  deleteMeal(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).send({ message: 'Provide a valid meal id' });
    }
    return models.meal
      .destroy({
        where: {
          userId,
          id,
        },
      })
      .then((deletedMealResponse) => {
        if (deletedMealResponse === 0) {
          return res.status(404).send({ message: 'Meal does not exsit' });
        }
        return res.status(200).send({ message: 'Meal has been deleted successfully' });
      })
      .catch((err) => {
        return res.status(400).send({ message: 'Unable to delete meal. Try again' });
      });
  },
};

export default MealController;
