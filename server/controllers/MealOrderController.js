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
    return res.status(201).send({ message: 'Order placed', data: newSelection });
  },
  makeOrder(req, res) {
    if (req.body.userId === '' || ' ') {
      return res.status(400).send({ message: 'Please provide a valid name' });
    }
    const { userId, content } = req.body;

    const newOrder = Order.placeOrder(userId, content);

    if (newOrder === false) {
      return res.status(400).send({ message: 'Please provide a valid price' });
    }

    return res.status(200).send({ data: newOrder });
  },
  getAllOrder(req, res) {
    const todayOrders = Order.getOrders();
    return res.status(200).send({ data: todayOrders });
  },
  modifyOrderMade(req, res) {
    if (req.body !== {}) {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
      const menuParsed = JSON.parse(menuData);
      const orderData = fs.readFileSync(path.join(`${__dirname}/../database/orderDatabase.json`));
      const modifyOrder = JSON.parse(orderData);
      if (req.body.add === 'true') {
        (menuParsed[`${day}/${month}/${year}`].menu).forEach((mealInMenu) => {
          if (mealInMenu.name === req.body.addMealName) {
            mealInMenu.isChecked = 'true';
          }
        });
        const menuAdd = JSON.stringify(menuParsed, null, 2);
        fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuAdd, (err) => {
          if (err) {
            res.status(400).send({ message: 'Order not updated successfully' });
          }
          res.status(200);
        });
      }
      if (req.body.delete === 'true') {
        (menuParsed[`${day}/${month}/${year}`].menu).forEach((mealInMenu) => {
          if (mealInMenu.name === req.body.deleteMealName) {
            mealInMenu.isChecked = 'false';
          }
        });
        const menuDelete = JSON.stringify(menuParsed, null, 2);
        fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuDelete, (err) => {
          if (err) {
            res.status(400).send({ message: 'Order not updated successfully' });
          }
          res.status(200);
        });
      }
      const summaryOfOrder = [];
      let totalPriceofOrder = 0;
      (menuParsed[`${day}/${month}/${year}`].menu).forEach((mealInMenu) => {
        if (mealInMenu.isChecked === 'true') {
          const orderPerMeal = {
            mealName: mealInMenu.name,
            price: mealInMenu.price,
          };
          totalPriceofOrder += Number(mealInMenu.price);
          summaryOfOrder.push(orderPerMeal);
        }
      });
      modifyOrder[req.params.id].orderContent = summaryOfOrder;
      modifyOrder[req.params.id].totalCost = totalPriceofOrder;
      const menuOrderString = JSON.stringify(modifyOrder, null, 2);
      return fs.writeFile(path.join(`${__dirname}/../database/orderDatabase.json`), menuOrderString, (err) => {
        if (err) {
          return res.status(400).send({ message: 'Meal not added successfully' });
        }
        return res.status(200).send({ data: modifyOrder[req.params.id] });
      });
    }
    return res.status(204).send({ message: 'Order Not modified' });
  },
};

export default MealOrderController;
