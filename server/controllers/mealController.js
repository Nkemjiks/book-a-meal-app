import models from '../models';

const mealController = {
  /**
   * @description Create a meal
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  createMeal(req, res) {
    const { name, price, imageURL } = req.body;
    const userId = req.decoded.id;

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
      .catch(err => res.status(500).send({ message: err }));
  },

  /**
   * @description Get all meals added by the caterer
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  getAllCatererMeal(req, res) {
    const userId = req.decoded.id;
    return models.meal
      .findAll({
        where: {
          userId,
          isDeleted: false,
        },
        attributes: ['id', 'name', 'imageURL', 'price'],
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You have not added any meal' });
        }
        return res.status(200).send({ data: meal });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Get all meal added by all caterers
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  getAllMeal(req, res) {
    return models.meal
      .findAll({
        where: {
          isDeleted: false,
        },
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

  /**
   * @description Modify a meal added by a caterer
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  modifyMeal(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;
    const { name } = req.body;
    const stripMultipleSpaces = name && name.replace(/  +/g, ' ');

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

  /**
   * @description Delete a meal added by a caterer
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  deleteMeal(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;
    const date = new Date().toDateString();

    return models.meal
      .findById(id)
      .then(async (meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'This meal does not exist in the database' });
        }
        if (meal.userId !== userId) {
          return res.status(403).send({ message: 'You are not authorized to delete this meal' });
        }
        const menuExist = await models.menu.findOne({
          where: {
            date,
            userId,
          },
        });
        if (menuExist) {
          menuExist
            .hasMeal([id])
            .then((isInMenu) => {
              if (isInMenu) {
                return res.status(200).send({ message: 'Meal already exist in the menu for today' });
              }
              return meal
                .update({
                  isDeleted: true,
                })
                .then(deletedMeal => res.status(200).send({ message: 'Meal has been deleted successfully' }))
                .catch(err => res.status(500).send({ message: err.message }));
            })
            .catch(err => res.status(500).send({ message: err.message }));
        }  
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default mealController;
