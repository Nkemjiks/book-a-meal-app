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
    } = req.body;

    const stringifyPhoneNumber = phoneNumber.toString();

    if (!fullName || (/^ *$/.test(fullName) === true) || typeof fullName !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid name' });
    } else if (!email || (/^ *$/.test(email) === true) || typeof email !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid email address' });
    } else if (isNaN(stringifyPhoneNumber)) {
      return res.status(400).send({ message: 'Please provide a valid phone number' });
    } else if (!password || (/^ *$/.test(password) === true)) {
      return res.status(400).send({ message: 'Please provide a valid password' });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    return models.user
      .findOrCreate({
        where: { email },
        defaults: {
          fullName,
          phoneNumber: stringifyPhoneNumber,
          email,
          password: hashPassword,
        },
      })
      .spread((user, created) => {
        if (created === false) {
          return res.status(409).send({ message: 'User already exist' });
        }
        const filteredUserDetail = filterUserDetail(user);
        const token = generateToken(filteredUserDetail);
        return res.status(201).send({ message: 'User created', data: filteredUserDetail, token });
      })
      .catch((err) => {
        return res.status(400).send({ message: err.errors[0].message });
      });
  },
  logInUser(req, res) {
    const { email, password } = req.body;
    if (!email || (/^ *$/.test(email) === true) || typeof email !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid email address' });
    } else if (!password || (/^ *$/.test(password) === true)) {
      return res.status(400).send({ message: 'Please provide a password' });
    }
    const checkUser = User.loginUser(email, password);
    if (checkUser === false) {
      return res.status(401).send({ message: 'Login unsuccessful. Please enter correct email address and password' });
    }

    return res.status(200).send({ message: 'Login successful', data: checkUser });
  },
};

export default UserController;
