import models from '../models';
import { filterOrderDetail } from '../common/filter';
import { placeOrderValidation, modifyOrderValidation } from '../common/validation';

const mealOrderController = {
  /**
   * @description Place an order
   * @param  {Object} req - The object that sends the request
   * @param  {Object} res - The object that returns a response
   * @return {Object}
   */
  makeOrder(req, res) {
    const userId = req.decoded.id;
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = `${hours}:${minutes}`;
    const date = new Date().toDateString();

    const {
      mealId,
      quantity,
      deliveryAddress,
    } = req.body;

    placeOrderValidation(mealId, quantity, deliveryAddress, hours, res);

    models.menu
      .findOne({ where: { date } })
      .then((menu) => {
        if (!menu) {
          return res.status(404).send({ message: 'The menu for today has not been set yet' });
        }
      })
      .catch(err => res.status(500).send({ message: err.message }));

    return models.meal
      .findOne({
        where: {
          id: mealId,
        },
      })
      .then((meal) => {
        if (!meal) {
          return res.status(404).send({ message: 'Meal not found' });
        }
        const orderedMeal = meal;
        return orderedMeal;
      })
      .then((orderedMeal) => {
        models.order
          .create({
            customerId: userId,
            catererId,
            time,
            mealName: orderedMeal.name,
            mealId: orderedMeal.id,
            mealPrice: orderedMeal.price,
            quantity,
            totalCost: (Number(orderedMeal.price) * Number(quantity)),
            deliveryAddress,
          })
          .then(order => res.status(201).send({ message: 'Order Placed successfully', data: order }))
          .catch(err => res.status(500).send({ message: err.message }));
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Get all orders that has been placed by customers
   * @param  {Object} req - The object that sends the request
   * @param  {Object} res - The object that returns a response
   * @return {Object}
   */
  getOrder(req, res) {
    const catererId = req.decoded.id;
    const date = new Date().toDateString();

    return models.order
      .findAll({
        where: {
          catererId,
          date,
        },
        include: [
          {
            model: models.user,
            as: 'user',
            attributes: ['fullName', 'email', 'phoneNumber', 'address'],
          },
        ],
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You done have any order yet' });
        }
        const filteredOrder = [];
        meal.forEach((meals) => {
          const filter = filterOrderDetail(meals);
          filteredOrder.push(filter);
        });
        return res.status(200).send({ message: 'You have the following orders', data: filteredOrder });
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
    const {
      mealId,
      quantity,
      deliveryAddress,
    } = req.body;

    modifyOrderValidation(id, mealId, quantity, deliveryAddress, res, req);

    return models.order
      .findById(id)
      .then((order) => {
        if (!order) {
          return res.status(404).send({ message: 'Order not found' });
        }
        if (order.customerId !== userId) {
          return res.status(401).send({ message: 'You can not modify this order' });
        }

        const orderHour = new Date(order.createdAt).getHours() * 60;
        const orderMinutes = new Date(order.createdAt).getMinutes();
        const orderTime = orderHour + orderMinutes;
        const presentTime = (new Date().getHours() * 60) + (new Date().getMinutes());

        if ((presentTime - orderTime) > 60) {
          return res.status(404).send({ message: 'You can not modify this order anymore' });
        }
        if (mealId) {
          return models.meal
            .findById(mealId)
            .then((meal) => {
              if (!meal) {
                return res.status(404).send({ message: 'Meal not found' });
              }
              const mealPrice = meal.price;
              const updatedCost = Number(mealPrice) * Number(quantity);
              return order
                .updateAttributes({
                  mealName: meal.name,
                  mealPrice,
                  mealId,
                  quantity,
                  deliveryAddress,
                  totalCost: updatedCost,
                })
                .then(modifiedOrder => res.status(200).send({ data: modifiedOrder }))
                .catch(err => res.status(500).send({ message: err.message }));
            })
            .catch(err => res.status(500).send({ message: err.message }));
        }
        const updatedCost = Number(order.mealPrice) * Number(quantity);
        return order
          .updateAttributes({
            quantity,
            deliveryAddress,
            totalCost: updatedCost,
          })
          .then(modifiedOrder => res.status(200).send({ data: modifiedOrder }))
          .catch(err => res.status(500).send({ message: err.message }));
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default mealOrderController;
