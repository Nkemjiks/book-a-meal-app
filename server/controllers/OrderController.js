import fs from 'fs';
import path from 'path';
import Order from '../models/order';

const OrderController = {
  makeOrder(req, res) {
    if (req.body.id !== undefined && req.body.customerName !== undefined) {
      const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
      const menuParsed = JSON.parse(menuData);
      const orderData = fs.readFileSync(path.join(`${__dirname}/../database/orderDatabase.json`));
      const order = JSON.parse(orderData);
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
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
      order[req.body.id] = new Order(req.body.customerName, summaryOfOrder, totalPriceofOrder);
      const menuOrderString = JSON.stringify(order, null, 2);
      return fs.writeFile(path.join(`${__dirname}/../database/orderDatabase.json`), menuOrderString, (err) => {
        if (err) {
          return res.status(400).send({ message: 'Order not placed successfully' });
        }
        return res.status(200).send({ data: order });
      });
    }
    return res.status(206).send({ message: 'Order placement data is incomplete' });
  },
  getAllOrder(req, res) {
    fs.readFile((path.join(`${__dirname}/../database/orderDatabase.json`)), 'utf8', (err, data) => {
      const order = JSON.parse(data);
      if (err) {
        return res.status(400).send({ message: 'Getting orders unsuccessful' });
      }
      return res.status(200).send({ data: order });
    });
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

export default OrderController;
