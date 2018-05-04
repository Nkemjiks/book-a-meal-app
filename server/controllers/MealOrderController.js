import Order from '../models/order';

const MealOrderController = {
  placeOrder(req, res) {
    const { userName } = req.body;
    const { mealId } = req.params;

    if (isNaN(mealId)) {
      return res.status(404).send({ message: 'Provide a valid meal id' });
    }

    if (!userName || (/^ *$/.test(userName)) === true) {
      return res.status(400).send({ message: 'Please provide a valid userName' });
    }
    const newSelection = Order.create(userName, mealId);
    if (newSelection === false) {
      return res.status(404).send({ message: 'Meal not found' });
    }
    if (newSelection === 'No Menu') {
      return res.status(404).send({ message: 'Menu has not been created yet' });
    }
    return res.status(201).send({ message: 'Order placed', data: newSelection });
  },
  getAllOrder(req, res) {
    const todayOrders = Order.getOrders();
    return res.status(200).send({ data: todayOrders });
  },
  modifyOrderMade(req, res) {
    const { userName } = req.body;
    const { orderId } = req.params;

    if (isNaN(orderId)) {
      return res.status(404).send({ message: 'Provide a valid order id' });
    }
    if (!userName || (/^ *$/.test(userName)) === true) {
      return res.status(400).send({ message: 'Please provide a valid userName' });
    }

    const modifyOrder = Order.modifyOrder(orderId, userName);

    if (modifyOrder === false) {
      return res.status(404).send({ message: 'Order Not found' });
    }
    return res.status(200).send({ message: 'Order deleted' });
  },
};

export default MealOrderController;
