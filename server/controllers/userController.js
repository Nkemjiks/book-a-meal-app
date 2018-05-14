import bcrypt from 'bcrypt';
import models from '../models';
import { filterUserDetail } from '../common/filter';
import { generateToken } from '../common/token';
import { signupValidation, signInValidation, roleUpdateValidation } from '../common/validation';

const userController = {
  /**
   * @description Sign up a user
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  addUser(req, res) {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
    } = req.body;

    signupValidation(fullName, email, phoneNumber, password, address, res);

    const stripMultipleSpaces = fullName.replace(/  +/g, ' ').trim();
    const hashPassword = bcrypt.hashSync(password, 10);
    return models.user
      .findOrCreate({
        where: { email },
        defaults: {
          fullName: stripMultipleSpaces,
          phoneNumber,
          email,
          password: hashPassword,
          address,
        },
      })
      .spread((user, created) => {
        if (created === false) {
          return res.status(409).send({ message: 'A User already exist with this email address' });
        }
        const filteredUserDetail = filterUserDetail(user);
        const token = generateToken(filteredUserDetail);
        return res.status(201).send({ message: 'User successfully created', data: filteredUserDetail, token });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Sign in a user
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  logInUser(req, res) {
    const { email, password } = req.body;

    signInValidation(email, password, res);

    return models.user
      .findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const hashPassword = user.password;
          if (bcrypt.compareSync(password, hashPassword)) {
            const filteredUserDetail = filterUserDetail(user);
            const token = generateToken(filteredUserDetail);
            return res.status(200).send({ message: 'Signin successful', data: filteredUserDetail, token });
          }
          return res.status(401).send({ message: 'Email or password is incorrect' });
        }
        return res.status(401).send({ message: 'Account does not exist. Please signup to continue' });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },

  /**
   * @description Update a user role
   * @param  {Object} req
   * @param  {Object} res
   * @return {Object}
   */
  updateUserRole(req, res) {
    const { id } = req.decoded;

    roleUpdateValidation(id, res);

    return models.user
      .findOne({ where: { id } })
      .then((user) => {
        if (user) {
          if (user.role === 'customer') {
            user.update({ role: 'caterer' });
            const filteredUserDetail = filterUserDetail(user);
            return res.status(200).send({ message: 'Update successful', data: filteredUserDetail });
          }
          return res.status(409).send({ message: 'You are already a caterer' });
        }
        return res.status(404).send({ message: 'User not found. Please signup to continue' });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default userController;
