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
    this.isAvailable = false;
    this.isIdExist = false;
  }
  create(userName, mealId) {
    const todayMenu = menuDatabase.data.filter(menu => menu.createdAt === this.createdAtDate)[0];
    if (todayMenu !== undefined) {
      const selectedMeal = todayMenu.meals.filter(meal => meal.id === Number(mealId));
      if (selectedMeal.length === 1) {
        const order = {
          customerName: userName,
          orderContent: selectedMeal[0],
          orderedAtTime: this.createdAtTime,
          orderedAtDate: this.createdAtDate,
        };
        orderDatabase.data.push(order);
        return order;
      }
      return this.isAvailable;
    }
    return 'No Menu';
  }
  getOrders() {
    const todayOrder = orderDatabase.data.filter((data) => {
      if (data.orderedAtDate === this.createdAtDate) {
        return data;
      }
    });
    return todayOrder;
  }
  modifyOrder(orderId, userName) {
    let orderIndex;
    orderDatabase.data.filter((data) => {
      if ((data.customerName === userName) && (data.id === Number(orderId))) {
        orderIndex = orderDatabase.data.indexOf(data);
      }
    });
    if (typeof orderIndex === 'number') {
      orderDatabase.data.splice((orderIndex), 1);
      return orderDatabase.data;
    }
    return this.isIdExist;
  }
}

export default new Order();
