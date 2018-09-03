import models from '../models';

/**
 * @description Validate the role of a user to make sure its a caterer
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const checkUserRole = async (req, res, next) => {
  const { email, role } = req.decoded;
  return models.user
    .findOne({
      where: { email },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User account does not exist' });
      }
      if (role !== 'caterer') {
        return res.status(403).send({ message: 'You don\'t have access to use this route' });
      }
      next();
      return null;
    })
    .catch(err => res.status(500).send({ message: 'Error found in server', data: err.message }));
};

/**
 * @description Validate the a user is authenticated
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const checkAuthenticatedUser = (req, res, next) => {
  const { email } = req.decoded;
  return models.user
    .findOne({
      where: { email },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User account does not exist' });
      }
      next();
      return null;
    })
    .catch(err => res.status(500).send({ message: 'Error found in server', data: err.message }));
};

/**
 * @description Validate the id of the meal are present
 * in the meal database before adding meals to menu
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const checkValidMealIds = (req, res, next) => {
  const userId = req.decoded.id;

  // Search through the meal table to make sure that the meal exists
  const { meals } = req.body;
  return models.meal
    .findAll({
      where: {
        id: { $in: meals },
        userId,
      },
    })
    .then((result) => {
      if (meals.length !== result.length) {
        return res.status(403).send({ message: 'Some selected meals does not exist' });
      }
      next();
      return null;
    })
    .catch(err => res.status(500).send({ message: err }));
};

/**
 * @description Validate the id of the meal are present in
 * the meal database before removing from menu
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const checkValidMealId = (req, res, next) => {
  const userId = req.decoded.id;

  // Search through the meal table to make sure that the meal exists
  const { id } = req.params;

  return models.meal
    .findAll({
      where: {
        id,
        userId,
      },
    })
    .then((result) => {
      if (result.length === 0) {
        return res.status(403).send({ message: 'This meal does not exist' });
      }
      next();
      return null;
    })
    .catch(err => res.status(500).send({ message: err }));
};
