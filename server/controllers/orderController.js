import models from '../models';
import calculateTotalSales from '../helpers/calculation';
import { filterCatererOrders, filterPlaceOrder } from '../helpers/filter';

const mealOrderController = {
  /**
   * @description Place an order
   * @param  {Object} req - The object that sends the request
   * @param  {Object} res - The object that returns a response
   * @return {Object}
   */
  async placeOrder(req, res) {
    const userId = req.decoded.id;
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = `${hours}:${minutes}`;
    const mealIds = [];

    const { catererId, meals, deliveryAddress } = req.body;

    for (let i = 0; i < meals.length; i += 1) {
      mealIds.push(meals[i].mealId);
    }

    const menu = await models.menu.findOne({ where: { userId: catererId } });
    if (menu === null) {
      return res.status(404).send({ message: 'No menu has been created yet' });
    }

    const mealsInMenu = await menu.getMeals({ where: { id: mealIds } });
    if (mealsInMenu.length !== mealIds.length) {
      return res.status(403).send({ message: 'Some selected meals does not exist' });
    }

    try {
      const createOrder = await models.order.create({ userId, time, deliveryAddress });
      if (createOrder.id) {
        for (const meal of meals) {
          await createOrder.addMeals(meal.mealId, { through: { quantity: meal.quantity } });
        }
      }
      const getOrder = await createOrder.getMeals();
      const filterOrder = filterPlaceOrder(createOrder, getOrder);
      return res.status(201).send({ message: 'Order Placed successfully', data: filterOrder });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  },

  /**
   * @description Get all orders that has been placed by customers for that day
   * @param  {Object} req - The object that sends the request
   * @param  {Object} res - The object that returns a response
   * @return {Object}
   */
  getCatererOrder(req, res) {
    const userId = req.decoded.id;
    const date = new Date().toDateString();

    return models.order
      .findAll({
        where: {
          date,
          isDeleted: false,
        },
        include: [
          {
            model: models.meal,
            where: {
              userId,
            },
            attributes: ['id', 'name', 'imageURL', 'price', 'isDeleted'],
          },
          {
            model: models.user,
            attributes: ['id', 'fullName', 'email', 'phoneNumber', 'address'],
          },
        ],
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You don\'t have any order yet' });
        }
        const totalSales = calculateTotalSales(meal);
        const filterOrder = filterCatererOrders(meal);
        return res.status(200).send({ message: 'You have the following orders', data: filterOrder, totalSales });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Get all orders that has been placed by customers
   * @param  {Object} req - The object that sends the request
   * @param  {Object} res - The object that returns a response
   * @return {Object}
   */
  getAllCatererOrder(req, res) {
    const userId = req.decoded.id;
    const { offset, limit } = req.query;
    return models.order
      .findAndCountAll({
        distinct: true,
        where: {
          isDeleted: false,
        },
        include: [
          {
            model: models.meal,
            where: {
              userId,
            },
            attributes: ['id', 'name', 'imageURL', 'price', 'isDeleted'],
          },
          {
            model: models.user,
            attributes: ['id', 'fullName', 'email', 'phoneNumber', 'address'],
          },
        ],
        order: [['updatedAt', 'DESC']],
        offset: offset || 0,
        limit: limit || 10,
      })
      .then((meal) => {
        const filterOrder = filterCatererOrders(meal.rows);
        const totalSales = calculateTotalSales(meal.rows);
        return res.status(200).send({
          message: 'You have the following orders',
          data: filterOrder,
          count: meal.count,
          totalSales,
        });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Get all orders that has been placed by this customer
   * @param  {Object} req - The object that sends the request
   * @param  {Object} res - The object that returns a response
   * @return {Object}
   */
  getCustomerOrder(req, res) {
    const userId = req.decoded.id;

    return models.order
      .findAll({
        where: {
          userId,
          isDeleted: false,
        },
        include: [
          {
            model: models.meal,
            attributes: ['id', 'name', 'imageURL', 'price', 'isDeleted'],
          },
          {
            model: models.user,
            attributes: ['id', 'fullName', 'email', 'phoneNumber', 'address'],
          },
        ],
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You have not placed any order yet' });
        }
        const totalExpenses = calculateTotalSales(meal);
        const filterOrder = filterCatererOrders(meal);
        return res.status(200).send({ message: 'You have placed the following orders', data: filterOrder, totalExpenses });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Modify an order
   * @param  {Object} req - The object that sends the request
   * @param  {Object} res - The object that returns a response
   * @return {Object}
   */
  modifyOrder(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;
    const { meals, deliveryAddress } = req.body;

    return models.order
      .findOne({
        where: {
          id,
          isDeleted: false,
        },
      })
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order not found' });
        }
        if (order.userId !== userId) {
          return res.status(401).send({ message: 'You can not modify this order' });
        }

        if ((((Date.now() - new Date(order.createdAt).getTime()) / 1000) / 60) > 60) {
          return res.status(401).send({ message: 'You can not modify this order anymore' });
        }
        return order
          .update({ deliveryAddress })
          .then((updatedOrder) => {
            for (const meal of meals) {
              updatedOrder.setMeals(meal.mealId, { through: { quantity: meal.quantity } });
            }
            return updatedOrder;
          })
          .then((updatedOrder) => {
            setTimeout(() => {
              updatedOrder.getMeals().then((adds) => {
                const filterOrder = filterPlaceOrder(updatedOrder, adds);
                return res.status(200).send({ message: 'Order Modified successfully', data: filterOrder });
              });
            }, 100);
          })
          .catch(err => res.status(500).send({ message: err.message }));
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default mealOrderController;
