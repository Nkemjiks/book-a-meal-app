import mealDatabase from '../database/mealDatabase';

class Meal {
  constructor() {
    this.id = null;
    this.name = '';
    this.price = null;
    this.image = '';
    this.isIdExist = true;
  }
  add(name, price, image) {
    let mealExist = false;

    mealDatabase.data.forEach((meal) => {
      if (meal.name === name) {
        mealExist = true;
      }
    });
    if (mealExist) {
      return mealExist;
    }

    this.id = mealDatabase.data.length + 1;
    this.name = name;
    this.price = price;
    this.image = image;
    mealDatabase.data.push({
      id: this.id,
      name: this.name,
      price: this.price,
      image: this.image,
    });
    return mealDatabase.data;
  }
  findAll() {
    return mealDatabase.data;
  }
  update(id, req) {
    const checkKeys = Object.keys(req.body);
    checkKeys.forEach((dataKey) => {
      mealDatabase.data[id - 1][dataKey] = req.body[dataKey];
    });
    return mealDatabase.data[id - 1];
  }
  delete(id) {
    if (id < 1 || id > mealDatabase.data.length) {
      this.isIdExist = false;
      return this.isIdExist;
    }
    mealDatabase.data.splice((id - 1), 1);
    return mealDatabase.data;
  }
}

export default new Meal();
