import models from '../models';

const MealController = {
  createMeal(req, res) {
    const { name, price, imageURL } = req.body;
    const userId = req.decoded.id;

    if (Number.isNaN(parseFloat(userId))) {
      return res.status(400).send({ message: 'Provide a valid User Id' });
    }

    if (!name || (/^ *$/.test(name) === true) || typeof name !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid meal name' });
    } else if (name.length < 10 || name.length > 40) {
      return res.status(400).send({ message: 'Meal Name must be between 10 to 40 characters long' });
    } else if (!price || (Number.isNaN(parseFloat(price))) === true || (/^ *$/.test(price) === true)) {
      return res.status(400).send({ message: 'Please provide a valid meal price' });
    } else if (typeof imageURL !== 'string' || (/^ *$/.test(imageURL) === true)) {
      return res.status(400).send({ message: 'Please provide a valid image URL' });
    }
    return models.meal
      .findOrCreate({
        where: { name },
        defaults: {
          name,
          price,
          imageURL,
          userId,
        },
      })
      .spread((meal, created) => {
        if (created === false) {
          return res.status(409).send({ message: 'Meal already exist' });
        }
        return res.status(201).send({ message: 'New meal added successfully', data: meal });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  getAllCatererMeal(req, res) {
    const userId = req.decoded.id;
    return models.meal
      .findAll({
        where: {
          userId,
        },
        include: [
          {
            model: models.user,
            attributes: ['fullName', 'email', 'role'],
          },
        ],
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You have not added any meal' });
        }
        return res.status(200).send({ data: meal });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  modifyMeal(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
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
          .then(modifiedMeal => res.status(200).send({ data: modifiedMeal }))
          .catch(err => res.status(500).send({ message: err.message }));
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  deleteMeal(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;

    if (Number.isNaN(Number(id))) {
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
          return res.status(404).send({ message: 'Meal does not exist' });
        }
        return res.status(200).send({ message: 'Meal has been deleted successfully' });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default MealController;
