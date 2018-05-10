import models from '../models';

const mealController = {
  createMeal(req, res) {
    const { name, price, imageURL } = req.body;
    const userId = req.decoded.id;

    if (Number.isNaN(Number(userId))) {
      return res.status(400).send({ message: 'Provide a valid User Id' });
    }
    if (!name || (/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid meal name' });
    } else if (name.length < 1 || name.length > 40) {
      return res.status(400).send({ message: 'Meal Name must be between 10 to 40 characters long' });
    } else if (!price || (Number.isNaN(Number(price))) === true || (/^ *$/.test(price) === true)) {
      return res.status(400).send({ message: 'Please provide a valid meal price' });
    } else if (typeof imageURL !== 'string' || (/[<>]/.test(imageURL) === true) || (/^ *$/.test(imageURL) === true)) {
      return res.status(400).send({ message: 'Please provide a valid image URL' });
    }

    const stripMultipleSpaces = name.replace(/  +/g, ' ');

    return models.meal
      .findOrCreate({
        where: { name, userId },
        defaults: {
          name: stripMultipleSpaces,
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
        attributes: ['id', 'name', 'imageURL', 'price'],
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
  getAllMeal(req, res) {
    return models.meal
      .findAll({
        attributes: ['id', 'name', 'imageURL', 'price'],
        include: [
          {
            model: models.user,
            attributes: ['fullName', 'email', 'address', 'phoneNumber'],
          },
        ],
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'There is no meal in the database' });
        }
        return res.status(200).send({ data: meal });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  modifyMeal(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;
    const { name, price } = req.body;
    const stripMultipleSpaces = name && name.replace(/  +/g, ' ');

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ message: 'You have not provided any details to update' });
    }
    if (Number.isNaN(Number(id))) {
      return res.status(400).send({ message: 'Provide a valid meal id' });
    }
    if (price !== undefined && (price === '' || Number.isNaN(Number(price)))) {
      return res.status(400).send({ message: 'Provide a valid price value' });
    }
    if (name !== undefined && (name === '' || (/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string')) {
      return res.status(400).send({ message: 'Please provide a valid meal name' });
    }

    return models.meal
      .findOne({
        where: {
          name: stripMultipleSpaces,
        },
      })
      .then((mealExist) => {
        if (mealExist) {
          return res.status(409).send({ message: 'A meal with this name already exist' });
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
      .findById(id)
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'This meal does not exist in the database' });
        }
        if (meal.userId !== userId) {
          return res.status(403).send({ message: 'You are not authorized to delete this meal' });
        }
        return models.meal
          .destroy({
            where: {
              id,
            },
          })
          .then((deletedMealResponse) => {
            if (deletedMealResponse === 1) {
              return res.status(200).send({ message: 'Meal has been deleted successfully well' });
            }
          })
          .catch(err => res.status(500).send({ message: err.message }));
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default mealController;
