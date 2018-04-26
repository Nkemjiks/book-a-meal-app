import fs from 'fs';
import path from 'path';
import Order from '../models/order';


const OrderController = {
  makeOrder(req, res) {
    const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
    const menuParsed = JSON.parse(menuData);
    const orderData = fs.readFileSync(path.join(`${__dirname}/../database/orderDatabase.json`));
    const order = JSON.parse(orderData);
    const summaryOfOrder = [];
    let totalPriceofOrder = 0;
    (menuParsed[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`].menu).forEach((mealInMenu) => {
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
        return res.status(400).send({ message: 'Meal not added successfully' });
      }
      return res.status(200).send(order);
    });
  },
  getAllOrder(req, res) {
    fs.readFile((path.join(`${__dirname}/../database/orderDatabase.json`)), 'utf8', (err, data) => {
      const order = JSON.parse(data);
      if (err) {
        return res.status(400).send({ message: 'Database not found' });
      }
      return res.status(200).send(order);
    });
  },
  modifyOrderMade(req, res) {
    const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
    const menuParsed = JSON.parse(menuData);
    const orderData = fs.readFileSync(path.join(`${__dirname}/../database/orderDatabase.json`));
    const modifyOrder = JSON.parse(orderData);
    if (req.body.add === 'true') {
      (menuParsed[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`].menu).forEach((mealInMenu) => {
        if (mealInMenu.name === req.body.addMealName) {
          mealInMenu.isChecked = 'true';
        }
      });
      const menuAdd = JSON.stringify(menuParsed, null, 2);
      fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuAdd, (err) => {
        if (err) {
          res.status(400).send({ message: 'Menu not updated successfully' });
        }
        res.status(200);
      });
    }
    if (req.body.delete === 'true') {
      (menuParsed[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`].menu).forEach((mealInMenu) => {
        if (mealInMenu.name === req.body.deleteMealName) {
          mealInMenu.isChecked = 'false';
        }
      });
      const menuDelete = JSON.stringify(menuParsed, null, 2);
      fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuDelete, (err) => {
        if (err) {
          res.status(400).send({ message: 'Menu not updated successfully' });
        }
        res.status(200);
      });
    }
    const summaryOfOrder = [];
    let totalPriceofOrder = 0;
    (menuParsed[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`].menu).forEach((mealInMenu) => {
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
      return res.status(200).send(modifyOrder);
    });
  },
};

export default OrderController;
