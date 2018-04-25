import fs from 'fs';
import path from 'path';
import Order from '../models/order';


const OrderController = {
  makeOrder(req, res) {
    const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
    const menu = JSON.parse(menuData);
    const orderData = fs.readFileSync(path.join(`${__dirname}/../database/orderDatabase.json`));
    const order = JSON.parse(orderData);
    const summaryOfOrder = [];
    let totalPriceofOrder = 0;
    (menu[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`].menu).forEach((mealInMenu) => {
      const orderPerMeal = {
        mealName: mealInMenu.name,
        price: mealInMenu.price,
      };
      totalPriceofOrder += Number(mealInMenu.price);
      summaryOfOrder.push(orderPerMeal);
    });
    order[req.body.id] = new Order(req.body.customerName, summaryOfOrder, totalPriceofOrder);
    const menuOrderString = JSON.stringify(order, null, 2);
    return fs.writeFile(path.join(`${__dirname}/../database/orderDatabase.json`), menuOrderString, (err) => {
      if (err) {
        return res.status(400).send({ message: 'Meal not added successfully' });
      }
      return res.status(200).send(order);
    });
  },
};

export default OrderController;
