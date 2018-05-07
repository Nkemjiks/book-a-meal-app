import models from '../models';

const MealOrderController = {
  // addOrder(req, res) {
  //   const { quantity } = req.body;
  //   const { userId, id } = req.params;

  //   const newSelection = Order.add(id, quantity, userId);
  //   return res.send({ data: newSelection });
  // },
  makeOrder(req, res) {
    const userId = req.decoded.id;
    const { catererId, menuId } = req.body;

    if (isNaN(menuId)) {
      return res.status(404).send({ message: 'Provide a valid menu id' });
    }
    if (isNaN(catererId)) {
      return res.status(404).send({ message: 'Provide a valid caterer id' });
    }

    return models.order
      .create({ userId, catererId, menuId })
      .then((order) => {
        return res.status(201).send({ message: 'Order Placed successfully', data: order });
      })
      .catch((err) => {
        return res.status(400).send({ message: err.errors[0].message });
      });
  },
  getAllOrder(req, res) {
    const userId = req.decoded.id;
    const date = new Date().toDateString();

    return models.menu
      .findAll({
        where: {
          catererId: userId,
          date,
        },
        include: [
          {
            model: models.menu,
            attributes: ['meal'],
          },
          {
            model: models.user,
            attributes: ['fullName', 'email', 'phoneNumber', 'address'],
          },
        ],
      })
      .then((meal) => {
        return res.status(200).send({ data: meal });
      })
      .catch((err) => {
        return res.status(500).send({ message: 'Unable to get your orders for today. Try again' });
      });
  },
  // modifyOrderMade(req, res) {
  //   if (req.body !== {}) {
  //     const date = new Date();
  //     const day = date.getDate();
  //     const month = date.getMonth() + 1;
  //     const year = date.getFullYear();
  //     const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
  //     const menuParsed = JSON.parse(menuData);
  //     const orderData = fs.readFileSync(path.join(`${__dirname}/../database/orderDatabase.json`));
  //     const modifyOrder = JSON.parse(orderData);
  //     if (req.body.add === 'true') {
  //       (menuParsed[`${day}/${month}/${year}`].menu).forEach((mealInMenu) => {
  //         if (mealInMenu.name === req.body.addMealName) {
  //           mealInMenu.isChecked = 'true';
  //         }
  //       });
  //       const menuAdd = JSON.stringify(menuParsed, null, 2);
  //       fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuAdd, (err) => {
  //         if (err) {
  //           res.status(400).send({ message: 'Order not updated successfully' });
  //         }
  //         res.status(200);
  //       });
  //     }
  //     if (req.body.delete === 'true') {
  //       (menuParsed[`${day}/${month}/${year}`].menu).forEach((mealInMenu) => {
  //         if (mealInMenu.name === req.body.deleteMealName) {
  //           mealInMenu.isChecked = 'false';
  //         }
  //       });
  //       const menuDelete = JSON.stringify(menuParsed, null, 2);
  //       fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuDelete, (err) => {
  //         if (err) {
  //           res.status(400).send({ message: 'Order not updated successfully' });
  //         }
  //         res.status(200);
  //       });
  //     }
  //     const summaryOfOrder = [];
  //     let totalPriceofOrder = 0;
  //     (menuParsed[`${day}/${month}/${year}`].menu).forEach((mealInMenu) => {
  //       if (mealInMenu.isChecked === 'true') {
  //         const orderPerMeal = {
  //           mealName: mealInMenu.name,
  //           price: mealInMenu.price,
  //         };
  //         totalPriceofOrder += Number(mealInMenu.price);
  //         summaryOfOrder.push(orderPerMeal);
  //       }
  //     });
  //     modifyOrder[req.params.id].orderContent = summaryOfOrder;
  //     modifyOrder[req.params.id].totalCost = totalPriceofOrder;
  //     const menuOrderString = JSON.stringify(modifyOrder, null, 2);
  //     return fs.writeFile(path.join(`${__dirname}/../database/orderDatabase.json`), menuOrderString, (err) => {
  //       if (err) {
  //         return res.status(400).send({ message: 'Meal not added successfully' });
  //       }
  //       return res.status(200).send({ data: modifyOrder[req.params.id] });
  //     });
  //   }
  //   return res.status(204).send({ message: 'Order Not modified' });
  // },
};

export default MealOrderController;
