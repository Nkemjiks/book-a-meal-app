import fs from 'fs';
import path from 'path';
import Menu from '../models/menu';

const MenuController = {
  createMenu(req, res) {
    if (!(req.body.constructor === Object && Object.keys(req.body).length === 0)) {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const mealData = fs.readFileSync(path.join(`${__dirname}/../database/mealDatabase.json`));
      const meal = JSON.parse(mealData);
      const menuData = fs.readFileSync(path.join(`${__dirname}/../database/menuDatabase.json`));
      const menuParsed = JSON.parse(menuData);
      const filter = meal.data.filter(checkName => checkName.isChecked === 'true');
      if (!menuParsed[`${day}/${month}/${year}`] && (req.body.id !== '')) {
        menuParsed[`${day}/${month}/${year}`] = new Menu(req.body.id, filter);
        const menuDataUpdate = JSON.stringify(menuParsed, null, 2);
        return fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuDataUpdate, (err) => {
          if (err) {
            return res.status(400).send({ message: 'Meal not added successfully' });
          }
          return res.status(201).send({ data: menuParsed });
        });
      }
      if (menuParsed[`${day}/${month}/${year}`]) {
        menuParsed[`${day}/${month}/${year}`].menu = filter;
        const menuDataUpdate = JSON.stringify(menuParsed, null, 2);
        return fs.writeFile(path.join(`${__dirname}/../database/menuDatabase.json`), menuDataUpdate, (err) => {
          if (err) {
            return res.status(400).send({ message: 'Meal not added successfully' });
          }
          return res.status(200).send({ data: menuParsed });
        });
      }
    }
    return res.status(204).send({});
  },
  getMenu(req, res) {
    fs.readFile((path.join(`${__dirname}/../database/menuDatabase.json`)), 'utf8', (err, data) => {
      const menuParsed = JSON.parse(data);
      if (err) {
        return res.status(400).send({ message: 'Database not found' });
      }
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const todayMenu = menuParsed[`${day}/${month}/${year}`].menu;
      return res.status(200).send({ data: todayMenu });
    });
  },
};

export default MenuController;
