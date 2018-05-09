import bcrypt from 'bcrypt';
import models from '../models';
import filterUserDetail from '../common/filter';
import { generateToken } from '../common/token';

const UserController = {
  addUser(req, res) {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      address,
    } = req.body;

    if (!fullName || (/^ *$/.test(fullName) === true) || (/^[a-zA-Z ]+$/.test(fullName) === false) || typeof fullName !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid name' });
    } else if (!email || (/^ *$/.test(email) === true) || (/[<>]/.test(email) === true) || (/[ ]/.test(email) === true) || (/[@]/.test(email) === false) || typeof email !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid email address' });
    } else if (Number.isNaN(Number(phoneNumber))) {
      return res.status(400).send({ message: 'Please provide a valid phone number' });
    } else if (!password || (/^ *$/.test(password) === true) || (/[<>]/.test(password) === true)) {
      return res.status(400).send({ message: 'Please provide a valid password' });
    } else if (!address || (/^ *$/.test(address) === true) || (/[<>]/.test(address) === true) || typeof address !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid address' });
    }

    const stripMultipleSpaces = fullName.replace(/  +/g, ' ');
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
          return res.status(409).send({ message: 'User already exist' });
        }
        const filteredUserDetail = filterUserDetail(user);
        const token = generateToken(filteredUserDetail);
        return res.status(201).send({ message: 'User successfully created', data: filteredUserDetail, token });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
  logInUser(req, res) {
    const { email, password } = req.body;
    if (!email || (/^ *$/.test(email) === true) || (/[ ]/.test(email) === true) || (/[@]/.test(email) === false) || typeof email !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid email address' });
    } else if (!password || (/^ *$/.test(password) === true) || (/[<>]/.test(password) === true)) {
      return res.status(500).send({ message: 'Please provide a valid password' });
    }

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
  updateUserRole(req, res) {
    const { id } = req.params;
    if (Number.isNaN(Number(id))) {
      return res.status(404).send({ message: 'Provide a valid User id' });
    }

    return models.user
      .findOne({ where: { id } })
      .then((user) => {
        if (user) {
          user.update({ role: 'caterer' });
          const filteredUserDetail = filterUserDetail(user);
          return res.status(200).send({ message: 'Update successful', data: filteredUserDetail });
        }
        return res.status(404).send({ message: 'User not found. Please signup to continue' });
      })
      .catch(err => res.status(500).send({ message: err.message }));
  },
};

export default UserController;
