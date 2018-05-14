/**
 * @description Validate signup user inputs
 * @param  {String} fullName - The user full name
 * @param  {String} email - The user email address
 * @param  {Integer} phoneNumber -  The user phone number
 * @param  {String} password -  The user password
 * @param  {String} address - The user address
 * @param  {Object} res - The object that returns a response
 * @returns {Object}
 */
export const signupValidation = (fullName, email, phoneNumber, password, address, res) => {
  if (!(fullName) || (/^ *$/.test(fullName) === true) || (/^[a-zA-Z ]+$/.test(fullName) === false) || typeof fullName !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid name' });
  } else if (!email || (/^ *$/.test(email) === true) || (/[<>]/.test(email) === true) || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) || typeof email !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid email address' });
  } else if (Number.isNaN(Number(phoneNumber))) {
    return res.status(400).send({ message: 'Please provide a valid phone number' });
  } else if (!password || (/^ *$/.test(password) === true) || (/[ ]/.test(password) === true) || (/[=]/.test(address) === true) || (/[<>]/.test(password) === true)) {
    return res.status(400).send({ message: 'Please provide a valid password' });
  } else if (!address || (/^ *$/.test(address) === true) || (/[<>]/.test(address) === true) || (/[=]/.test(address) === true) || typeof address !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid address' });
  }
};

/**
 * @description Validate signin user inputs
 * @param  {String} email -  The customer email address
 * @param  {String} password -  The customer password
 * @param  {Object} res - The object that returns a response
 * @returns {Object}
 */
export const signInValidation = (email, password, res) => {
  if (!email || (/^ *$/.test(email) === true) || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) || typeof email !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid email address' });
  } else if (!password || (/^ *$/.test(password) === true) || (/[ ]/.test(password) === true) || (/[<>]/.test(password) === true) || (/[=]/.test(address) === true)) {
    return res.status(400).send({ message: 'Please provide a valid password' });
  }
};

/**
 * @description Validate user role update id
 * @param  {Integer} id -  The customer id
 * @param  {Object} res - The object that returns a response
 * @returns {Object}
 */
export const roleUpdateValidation = (id, res) => {
  if (Number.isNaN(Number(id))) {
    return res.status(400).send({ message: 'Provide a valid User id' });
  }
};

/**
 * @description Validate add meal inputs and caterer id
 * @param  {String} name - The name of the meal
 * @param  {Integer} price -  The price of the meal
 * @param  {String} imageURL -  The link to where the image is saved online
 * @param  {Integer} userId - The id of the caterer
 * @param  {Object} res - The object that returns a response
 * @returns {Object}
 */
export const addMealValidation = (name, price, imageURL, userId, res) => {
  if (Number.isNaN(Number(userId))) {
    return res.status(400).send({ message: 'Provide a valid User Id' });
  }
  if (!name || (/^ *$/.test(name) === true) || (/^[a-zA-Z ]+$/.test(name) === false) || typeof name !== 'string') {
    return res.status(400).send({ message: 'Please provide a valid meal name' });
  } else if (name.length < 1 || name.length > 40) {
    return res.status(400).send({ message: 'Meal Name must be between 10 to 40 characters long' });
  } else if (!price || (Number.isNaN(Number(price))) === true || (/^ *$/.test(price) === true)) {
    return res.status(400).send({ message: 'Please provide a valid meal price' });
  } else if (typeof imageURL !== 'string' || (/[<>]/.test(imageURL) === true) || (/^ *$/.test(imageURL) === true)) {
    return res.status(400).send({ message: 'Please provide a valid image URL' });
  }
};

/**
 * @description Validate modify meal input
 * @param  {String} name - The new name of the meal
 * @param  {Integer} price -  The new pprice of the meal
 * @param  {String} imageURL -  The new link to the image
 * @param  {Integer} id - The id of the meal
 * @param  {Integer} userId - The id of the caterer
 * @param  {Object} res - The object that returns a response
 * @param  {Object} req - The object that sends the request
 * @returns {Object}
 */
export const modifyMealValidation = (name, price, imageURL, id, userId, res, req) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'You have not provided any details to update' });
  }
  if (Number.isNaN(Number(id))) {
    return res.status(400).send({ message: 'Provide a valid meal id' });
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
};

/**
 * @description Validate meal id for delete meal
 * @param  {Integer} id - The id of the meal
 * @param  {Object} res - The object that returns a response
 * @returns {Object}
 */
export const deleteMealValidation = (id, res) => {
  if (Number.isNaN(Number(id))) {
    return res.status(400).send({ message: 'Provide a valid meal id' });
  }
};

/**
 * @description Validate place order inputs
 * @param  {Integer} catererId - The id of the caterer
 * @param  {Integer} mealId -  The id of the meal
 * @param  {Integer} quantity -  The quantity of the meal
 * @param  {String} deliveryAddress -  The address it should be delivered to
 * @param  {Integer} hours - The time you can start placing orders from
 * @param  {Object} res - The object that returns a response
 * @returns {Object}
 */
export const placeOrderValidation = (
  catererId,
  mealId,
  quantity,
  deliveryAddress,
  hours,
  res,
) => {
  if (Number(hours) < 8) {
    return res.status(404).send({ message: 'You cannot place an order yet' });
  }
  if (Number(hours) > 16) {
    return res.status(404).send({ message: 'You cannot place any order for today' });
  }
  if (Number.isNaN(Number(mealId))) {
    return res.status(404).send({ message: 'Provide a valid menu id' });
  }
  if (Number.isNaN(Number(catererId))) {
    return res.status(404).send({ message: 'Provide a valid caterer id' });
  }
  if (Number.isNaN(Number(quantity))) {
    return res.status(404).send({ message: 'Provide a valid quantity value' });
  }
  if (Number(quantity) > 20) {
    return res.status(404).send({ message: 'Please select a quantity that is less than or equal to 20' });
  }
  if (Number(quantity) < 1) {
    return res.status(404).send({ message: 'Please select a quantity that is greater than or equal to 1' });
  }
  if (deliveryAddress && ((/^ *$/.test(deliveryAddress) === true) || (/[<>]/.test(deliveryAddress) === true) || typeof deliveryAddress !== 'string')) {
    return res.status(400).send({ message: 'Please provide a valid address' });
  }
};

/**
 * @description Validate meal id for delete meal
 * @param  {Integer} id - The order id
 * @param  {Integer} mealId - The new meal id
 * @param  {Integer} quantity - The new quantity
 * @param  {String} deliveryAddress - The new delivery address
 * @param  {Object} res - The object that returns a response
 * @param  {Object} req - The object that sends the request
 * @returns {Object}
 */
export const modifyOrderValidation = (id, mealId, quantity, deliveryAddress, res, req) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: 'You have not provided any details to update' });
  }
  if (Number.isNaN(Number(id))) {
    return res.status(404).send({ message: 'Provide a valid order id' });
  }
  if (Number.isNaN(Number(mealId))) {
    return res.status(404).send({ message: 'Provide a valid meal id' });
  }
  if (Number.isNaN(Number(quantity))) {
    return res.status(404).send({ message: 'Provide a valid quantity value' });
  }
  if (deliveryAddress && ((/^ *$/.test(deliveryAddress) === true) || (/[<>]/.test(deliveryAddress) === true) || typeof deliveryAddress !== 'string')) {
    return res.status(400).send({ message: 'Please provide a valid address' });
  }
};