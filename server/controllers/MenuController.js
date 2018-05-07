import models from '../models';

const MenuController = {
  createMenu(req, res) {
    const { mealId } = req.params;
    const userId = req.decoded.id;
    const date = new Date().toDateString();

    if (isNaN(mealId)) {
      return res.status(404).send({ message: 'Provide a valid meal id' });
    }

    return models.menu
      .findOrCreate({
        where: {
          userId,
          mealId,
          date,
        },
        defaults: {
          userId,
          mealId,
          date,
        },
      })
      .spread((menu, created) => {
        if (created === false) {
          return res.status(409).send({ message: 'Meal has already been added to today\'s menu' });
        }
        return res.status(201).send({ message: 'Meal added to menu successfully', data: menu });
      })
      .catch((err) => {
        return res.status(400).send({ message: err.errors[0].message });
      });
  },
  getMenu(req, res) {
    const { userId } = req.params;
    const date = new Date().toDateString();

    return models.menu
      .findAll({
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
      .then((meal) => {
        return res.status(200).send({ data: meal });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Unable to get caterer\'s meals for today. Try again' });
      });
  },
};

export default MenuController;
