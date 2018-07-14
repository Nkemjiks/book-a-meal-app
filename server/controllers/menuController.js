import models from '../models';
import { filterMenuDetails } from '../helpers/filter';

const menuController = {
  /**
   * @description Create a menu
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  createMenu(req, res) {
    const userId = req.decoded.id;
    const date = new Date().toDateString();

    const { meals } = req.body;
    return models.menu
      .findOrCreate({
        where: {
          userId,
          date,
        },
        defaults: {
          userId,
          date,
        },
      })
      .spread((menu, created) => {
        menu.addMeals(meals);
        menu.save();
        if (created === false) {
          return res.status(200).send({ message: 'Menu has been updated', data: menu });
        }
        return res.status(201).send({ message: 'Menu created', data: menu });
      })
      .catch(err => res.status(500).send({ message: err }));
  },

  /**
   * @description Get Caterer menu
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
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
            where: {
              isDeleted: false,
            },
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

  /**
   * @description Get all menu set for the day for customers
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  getAvailableMenu(req, res) {
    const date = new Date().toDateString();
    const { offset } = req.params;

    return models.menu
      .findAndCountAll({
        where: {
          date,
        },
        include: [
          {
            model: models.user,
            attributes: ['fullName', 'email', 'businessName', 'businessAddress', 'logoURL'],
          },
        ],
        offset,
        limit: 10,
      })
      .then((todayMenu) => {
        if (todayMenu.rows.length === 0) {
          return res.status(404).send({ message: 'The menu for today has not been set yet' });
        }
        const filteredMenu = [];
        todayMenu.rows.forEach((caterer) => {
          const filter = filterMenuDetails(caterer);
          filteredMenu.push(filter);
        });
        return res.status(200).send({ data: filteredMenu, count: todayMenu.count });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  getMealsInMenu(req, res) {
    const date = new Date().toDateString();
    const { id } = req.params;

    return models.menu
      .findAll({
        where: {
          date,
          userId: id,
        },
        include: [
          {
            model: models.meal,
            where: {
              isDeleted: false,
            },
            attributes: ['name', 'imageURL', 'price'],
          },
          {
            model: models.user,
            attributes: ['businessName', 'businessAddress', 'logoURL'],
          },
        ],
      })
      .then((meals) => {
        if (meals.length === 0) {
          return res.status(404).send({ message: 'There are no meals in the menu' });
        }
        return res.status(200).send({ data: meals[0].meals, caterer: meals[0].user });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default menuController;
