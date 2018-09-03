import models from '../models';
import { filterMenuDetails, filterCaterermenu, filterMealinMenu, filterCreateCaterermenu } from '../helpers/filter';

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
        },
        defaults: {
          userId,
          date,
        },
      })
      .spread((menu, created) => {
        menu.addMeals(meals);
        menu.save();
        setTimeout(() => {
          menu.getMeals().then((mealsAdded) => {
            const filteredMenu = filterCreateCaterermenu(mealsAdded);
            if (created === false) {
              return res.status(200).send({ message: 'Menu has been updated', data: menu, meals: filteredMenu.meals });
            }
            return res.status(201).send({ message: 'Menu created', data: menu, meals: filteredMenu.meals });
          });
        }, 100);
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

    return models.menu
      .findOne({
        where: {
          userId,
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
      .then((menu) => {
        if (menu === null) {
          return res.status(404).send({ message: 'You have not created a menu yet' });
        }

        const filteredMenu = filterCaterermenu(menu.dataValues);
        return res.status(200).send({ data: filteredMenu });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Remove certain meal from the menu by the caterer
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  removeMealFromMenu(req, res) {
    const userId = req.decoded.id;

    const { id } = req.params;

    return models.menu
      .findOne({
        where: {
          userId,
        },
      })
      .then((menu) => {
        if (!menu) {
          return res.status(404).send({ message: 'Menu does not exist' });
        }
        menu.removeMeals(id);
        menu.save();
        setTimeout(() => {
          menu.getMeals().then((meals) => {
            const filteredMenu = filterCreateCaterermenu(meals);
            return res.status(200).send({ message: 'Menu has been updated', data: menu, meals: filteredMenu.meals });
          });
        }, 100);
      })
      .catch(err => res.status(500).send({ message: err }));
  },

  /**
   * @description Get all menu set for the day for customers
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  getAvailableMenu(req, res) {
    const { offset, limit } = req.query;
    return models.menu
      .findAndCountAll({
        include: [
          {
            model: models.user,
            attributes: ['fullName', 'email', 'businessName', 'businessAddress', 'logoURL'],
          },
        ],
        offset: offset || 0,
        limit: limit || 10,
      })
      .then((todayMenu) => {
        if (todayMenu.rows.length === 0) {
          return res.status(404).send({ message: 'No menu available' });
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

  /**
   * @description Get all meals in a menu
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  getMealsInMenu(req, res) {
    const { id } = req.params;

    return models.menu
      .findAll({
        where: {
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
        const filterMeals = filterMealinMenu(meals[0].meals);
        return res.status(200).send({ data: filterMeals, caterer: meals[0].user });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default menuController;
