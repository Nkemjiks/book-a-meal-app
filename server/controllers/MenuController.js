import models from '../models';

const menuController = {
  createMenu(req, res) {
    const { mealId } = req.body;
    const userId = req.decoded.id;
    const date = new Date().toDateString();

    if (Number.isNaN(Number(mealId))) {
      return res.status(400).send({ message: 'Provide a valid meal id' });
    }

    return models.meal
      .findOne({
        where: {
          id: mealId,
          userId,
        },
      })
      .then((meal) => {
        if (!meal) {
          return res.status(403).send({ message: 'You can not add this meal' });
        }
        return models.menu
          .findOrCreate({
            where: {
              userId,
              date,
            },
            defaults: {
              userId,
              date,
              mealId,
            },
          })
          .spread((menu, created) => {
            menu.addMeals(mealId);
            menu.save();
            if (created === false) {
              return res.status(200).send({ message: 'Menu has been updated', data: menu });
            }
            return res.status(201).send({ message: 'Menu created', data: menu });
          })
          .catch(err => res.status(500).send({ message: err }));
      })
      .catch(err => res.status(500).send({ message: err }));
  },
  getCatererMenu(req, res) {
    const userId = req.decoded.id;
    const date = new Date().toDateString();

    return models.menu
      .findOne({
        where: {
          userId,
          date,
        },
        include: [
          {
            model: models.meal,
            attributes: ['name', 'imageURL', 'price'],
          },
        ],
      })
      .then((meals) => {
        if (meals === null) {
          return res.status(404).send({ message: 'The menu for today has not been set yet' });
        }
        return res.status(200).send({ data: meals });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  getAllMenu(req, res) {
    const date = new Date().toDateString();

    return models.menu
      .findAll({
        where: {
          date,
        },
        include: [
          {
            model: models.meal,
            attributes: ['name', 'imageURL', 'price'],
          },
          {
            model: models.user,
            attributes: ['fullName', 'email'],
          },
        ],
      })
      .then((meals) => {
        if (meals.length === 0) {
          return res.status(404).send({ message: 'The menu for today has not been set yet' });
        }
        return res.status(200).send({ data: meals });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default menuController;
