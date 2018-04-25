import fs from 'fs';
import path from 'path';
import Menu from '../models/menu';


const MenuController = {
  createMenu(req, res) {
    const mealData = fs.readFileSync(path.join(`${__dirname}/../database/mealDatabase.json`));
    const meal = JSON.parse(mealData);
    const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
    const menu = JSON.parse(menuData);
    const filter = meal.data.filter(checkName => checkName.isChecked === 'true');
    if (!menu[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`]) {
      menu[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`] = new Menu(req.body.id, filter);
      const menuDataUpdate = JSON.stringify(menu, null, 2);
      return fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuDataUpdate, (err) => {
        if (err) {
          return res.status(400).send({ message: 'Meal not added successfully' });
        }
        return res.status(200).send(menu);
      });
    }
    if (menu[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`]) {
      menu[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`].menu = filter;
      const menuDataUpdate = JSON.stringify(menu, null, 2);
      return fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuDataUpdate, (err) => {
        if (err) {
          return res.status(400).send({ message: 'Meal not added successfully' });
        }
        return res.status(200).send(menu);
      });
    }
  },
  getAllMeal(req, res) {
    fs.readFile((path.join(`${__dirname}/../database/menuDatabase.json`)), 'utf8', (err, data) => {
      const menu = JSON.parse(data);
      if (err) {
        return res.status(400).send({ message: 'Database not found' });
      }
      return res.status(200).send(menu[`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`].menu);
    });
  },
};

export default MenuController;
