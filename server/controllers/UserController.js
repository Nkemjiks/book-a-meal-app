import User from '../models/user';

const UserController = {
  addUser(req, res) {
    const {
      fullName,
      email,
      phoneNumber,
      password,
    } = req.body;

    if (!fullName || (/^ *$/.test(fullName) === true) || typeof fullName !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid name' });
    } else if (!email || (/^ *$/.test(email) === true) || typeof email !== 'string') {
      return res.status(400).send({ message: 'Please provide a valid email address' });
    } else if (!phoneNumber || isNaN(phoneNumber) === true) {
      return res.status(400).send({ message: 'Please provide a valid phone number' });
    } else if (!password || (/^ *$/.test(password) === true)) {
      return res.status(400).send({ message: 'Please provide a valid password' });
    }
    const newUser = User.createUser(fullName, email, phoneNumber, password);

    if (newUser === true) {
      return res.status(409).send({ message: 'A user is already registered with this email address' });
    }

    return res.status(201).send({ message: 'User successfully signed up', data: newUser });
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
