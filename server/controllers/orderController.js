import models from '../models';

const MealOrderController = {
  makeOrder(req, res) {
    const userId = req.decoded.id;
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const time = `${hours}:${minutes}`;
    const date = new Date().toDateString();

    const {
      catererId,
      mealId,
      quantity,
      deliveryAddress,
    } = req.body;

    if (Number(hours) < 8) {
      return res.status(404).send({ message: 'You cannot place an order yet' });
    }
    if (Number(hours) > 16) {
      return res.status(404).send({ message: 'You cannot place any order for today' });
    }
    if (Number.isNaN(Number(mealId))) {
      return res.status(404).send({ message: 'Provide a valid menu id' });
    }
    if (Number.isNaN(Number(catererId))) {
      return res.status(404).send({ message: 'Provide a valid caterer id' });
    }
    if (Number.isNaN(Number(quantity))) {
      return res.status(404).send({ message: 'Provide a valid quantity value' });
    }
    if (Number(quantity) > 20) {
      return res.status(404).send({ message: 'Please select a quantity that is less than or equal to 20' });
    }
    if (Number(quantity) < 1) {
      return res.status(404).send({ message: 'Please select a quantity that is greater than or equal to 1' });
    }
    if (deliveryAddress && ((/^ *$/.test(deliveryAddress) === true) || (/[<>]/.test(deliveryAddress) === true) || typeof deliveryAddress !== 'string')) {
      return res.status(400).send({ message: 'Please provide a valid address' });
    }

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
            attributes: ['fullName', 'email', 'phoneNumber', 'address'],
          },
        ],
      })
      .then((meal) => {
        if (meal.length === 0) {
          return res.status(404).send({ message: 'You done have any order yet' });
        }
        return res.status(200).send({ data: meal });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  modifyOrder(req, res) {
    const userId = req.decoded.id;
    const { id } = req.params;
    const {
      quantity,
      deliveryAddress,
    } = req.body;

    if (Number.isNaN(Number(id))) {
      return res.status(404).send({ message: 'Provide a valid order id' });
    }
    if (Number.isNaN(Number(quantity))) {
      return res.status(404).send({ message: 'Provide a valid quantity value' });
    }
    if (deliveryAddress && ((/^ *$/.test(deliveryAddress) === true) || (/[<>]/.test(deliveryAddress) === true) || typeof deliveryAddress !== 'string')) {
      return res.status(400).send({ message: 'Please provide a valid address' });
    }

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

export default MealOrderController;
