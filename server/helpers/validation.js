/**
 * @description Validate signup user inputs
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const signupValidation = (req, res, next) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    address,
  } = req.body;

  if (!(fullName) || (/^ *$/.test(fullName) === true) || (/^[a-zA-Z ]+$/.test(fullName) === false) || typeof fullName !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid name' });
  } else if (!email || (/^ *$/.test(email) === true) || (/[<>]/.test(email) === true) || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) || typeof email !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid email address' });
  } else if (Number.isNaN(Number(phoneNumber))) {
    return res.status(400).send({ message: 'Please provide a valid phone number' });
  } else if (!password || (/^ *$/.test(password) === true) || (/[ ]/.test(password) === true) || (/[<>]/.test(password) === true)) {
    return res.status(400).send({ message: 'Please provide a valid password' });
  } else if (!address || (/^ *$/.test(address) === true) || (/[<>]/.test(address) === true) || (/[=]/.test(address) === true) || typeof address !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid address' });
  }
  return next();
};

/**
 * @description Validate signin user inputs
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const signInValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || (/^ *$/.test(email) === true) || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) || typeof email !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid email address' });
  } else if (!password || (/^ *$/.test(password) === true) || (/[ ]/.test(password) === true) || (/[<>]/.test(password) === true) || (/[=]/.test(password) === true)) {
    return res.status(400).send({ message: 'Please provide a valid password' });
  }
  return next();
};

/**
 * @description Validate add meal inputs and caterer id
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const addMealValidation = (req, res, next) => {
  const { name, price, imageURL } = req.body;
  if (!name || (/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid meal name' });
  } else if (name.length < 1 || name.length > 40) {
    return res.status(400).send({ message: 'Meal Name must be between 1 to 40 characters long' });
  } else if (!price || (Number.isNaN(Number(price))) === true || (/^ *$/.test(price) === true)) {
    return res.status(400).send({ message: 'Please provide a valid meal price' });
  } else if (typeof imageURL !== 'string' || (/[<>]/.test(imageURL) === true) || (/^ *$/.test(imageURL) === true)) {
    return res.status(400).send({ message: 'Please provide a valid image URL' });
  }
  return next();
};

/**
 * @description Validate modify meal input
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const modifyMealValidation = (req, res, next) => {
  const { name, price, imageURL } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'You have not provided any details to update' });
  }
  if (price !== undefined && (price === '' || Number.isNaN(Number(price)))) {
    return res.status(400).send({ message: 'Provide a valid price value' });
  }
  if (name !== undefined && (name === '' || (/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string')) {
    return res.status(400).send({ message: 'Please provide a valid meal name' });
  }
  if (imageURL !== undefined && (typeof imageURL !== 'string' || (/[<>]/.test(imageURL) === true) || (/^ *$/.test(imageURL) === true))) {
    return res.status(400).send({ message: 'Please provide a valid image URL' });
  }
  return next();
};

/**
 * @description Validate create menu input
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const menuMealsValidation = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'You have not provided any details' });
  }
  return next();
};

/**
 * @description Validate place order inputs
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const orderValidation = (req, res, next) => {
  const hours = new Date().getHours();
  const { meals, deliveryAddress } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'You have not provided any details' });
  }
  if (Number(hours) < 9) {
    return res.status(404).send({ message: 'You cannot place an order yet' });
  }
  if (Number(hours) > 16) {
    return res.status(404).send({ message: 'You cannot place any more order today' });
  }
  if (meals.length === 0) {
    return res.status(400).send({ message: 'You have not provided any meal' });
  }

  for (const mealDetails of meals) {
    if (!mealDetails.mealId || (/^ *$/.test(mealDetails.mealId) === true) || (/^[a-z0-9-]+$/.test(mealDetails.mealId) === false) || typeof mealDetails.mealId !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid meal name' });
    }
    if (Number.isNaN(Number(mealDetails.quantity))) {
      return res.status(404).send({ message: 'Provide a valid quantity value' });
    }
    if (Number(mealDetails.quantity) > 20) {
      return res.status(404).send({ message: 'Please select a quantity that is less than or equal to 20' });
    }
    if (Number(mealDetails.quantity) < 1) {
      return res.status(404).send({ message: 'Please select a quantity that is greater than or equal to 1' });
    }
  }

  if (deliveryAddress && ((/^ *$/.test(deliveryAddress) === true) || (/[<>]/.test(deliveryAddress) === true) || typeof deliveryAddress !== 'string')) {
    return res.status(400).send({ message: 'Please provide a valid address' });
  }
  return next();
};
