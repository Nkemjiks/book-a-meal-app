/**
 * @description It calculates the total cost both for the caterer and customer
 * @param  {Object} order
 * @returns {Integer}
 */
const calculateTotalSales = (order) => {
  let total = 0;
  for (const orderDetails of order) {
    for (const meal of orderDetails.meals) {
      total += (meal.price * meal.orderItems.quantity);
    }
  }
  return total;
};

export default calculateTotalSales;
