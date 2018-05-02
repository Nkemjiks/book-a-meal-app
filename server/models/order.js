import menuDatabase from '../database/menuDatabase';
import orderDatabase from '../database/orderDatabase';

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
    this.isAvailable = false;
  }
  create(userName, mealId) {
    const todayMenu = menuDatabase.data.filter(menu => menu.createdAt === this.createdAtDate)[0];

    const selectedMeal = todayMenu.meals.filter(meal => meal.id === Number(mealId));
    if (selectedMeal.length === 1) {
      const order = {
        customerName: userName,
        orderContent: selectedMeal[0],
        orderedAt: this.createdAtTime,

      };
      orderDatabase.data.push(order);
      return order;
    }
    return this.isAvailable;
  }
  getOrders() {
    
  }
}

export default new Order();
