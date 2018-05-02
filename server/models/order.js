import menuDatabase from '../database/menuDatabase';
import orderDatabase from '../database/orderDatabase';
import cartDatabase from '../database/cartDatabase';

class Order {
  constructor() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    this.customerName = '';
    this.orderContent = '';
    this.createdAtTime = `${hour}:${minute}`;
    this.createdAtDate = `${day}-${month}-${year}`;
    this.totalCost = 0;
  }
  add(id, quantity, userId) {
    const todayMenu = menuDatabase.data.filter(menu => menu.createdAt === this.createdAtDate)[0];

    const selectedMeal = todayMenu.meals.filter(menu => menu.id === Number(id));
    if (selectedMeal.length === 1) {
      const meal = Object.assign({}, selectedMeal[0], {
        userId,
        quantity,
      });
      cartDatabase.data.push(meal);
    }
    return cartDatabase;
  }
}

export default new Order();
