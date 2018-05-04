import menuDatabase from '../database/menuDatabase';
import mealDatabase from '../database/mealDatabase';

class Menu {
  constructor() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    this.id = null;
    this.createdAt = `${day}-${month}-${year}`;
    this.mealAvailable = false;
    this.isIdExist = true;
  }
  create(id) {
    this.id = menuDatabase.data.length + 1;
    const meal = mealDatabase.data[id - 1];
    if (id < 1 || id > mealDatabase.data.length) {
      this.isIdExist = false;
      return this.isIdExist;
    }

    menuDatabase.data.forEach((menu) => {
      if (menu.createdAt === this.createdAt) {
        this.mealAvailable = true;
        menu.meals.push(meal);
      }
    });

    if (!this.mealAvailable) {
      menuDatabase.data.push({
        id: this.id,
        meals: [meal],
        createdAt: this.createdAt,
      });
    }
    const menuIndex = menuDatabase.data.filter((date) => {
      if (date.createdAt === this.createdAt) {
        return menuDatabase.data.indexOf(date);
      }
    });
    return menuIndex;
  }
  getMenu() {
    const todayMenu = menuDatabase.data.filter((date) => {
      if (date.createdAt === this.createdAt) {
        return menuDatabase.data.indexOf(date);
      }
    });
    return todayMenu;
  }
}

export default new Menu();
