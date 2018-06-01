import models from '../models';
import calculateTotalSales from '../helpers/calculation';

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
    const date = new Date().toDateString();

    const { meals, deliveryAddress } = req.body;

    const menu = await models.menu.findOne({ where: { date } });
    if (!menu) {
      return res.status(404).send({ message: 'The menu for today has not been set yet' });
    }

    return models.order
      .create({
        userId,
        time,
        deliveryAddress,
      })
      .then((order) => {
        for (const meal of meals) {
          order.setMeals(meal.mealId, { through: { quantity: meal.quantity } });
        }
        return res.status(201).send({ message: 'Order Placed successfully', data: order });
      })
      .catch(err => res.status(500).send({ message: err }));
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

        return res.status(200).send({ message: 'You have the following orders', data: meal, totalSales });
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

    return models.order
      .findAll({
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
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You don\'t have any order yet' });
        }
        const totalSales = calculateTotalSales(meal);

        return res.status(200).send({ message: 'You have the following orders', data: meal, totalSales });
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
    const date = new Date().toDateString();

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
        return res.status(200).send({ message: 'You have placed the following orders', data: meal, totalExpenses });
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

        const orderHour = new Date(order.createdAt).getHours() * 60;
        const orderMinutes = new Date(order.createdAt).getMinutes();
        const orderTime = orderHour + orderMinutes;
        const presentTime = (new Date().getHours() * 60) + (new Date().getMinutes());

        if ((presentTime - orderTime) > 60) {
          return res.status(401).send({ message: 'You can not modify this order anymore' });
        }
        return order
          .update({ deliveryAddress })
          .then((updatedOrder) => {
            for (const meal of meals) {
              updatedOrder.setMeals(meal.mealId, { through: { quantity: meal.quantity } });
            }
            return res.status(200).send({ message: 'Order Modified successfully', data: order });
          })
          .catch(err => res.status(500).send({ message: err.message }));
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default mealOrderController;
