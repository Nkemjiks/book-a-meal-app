import fs from 'fs';
import path from 'path';
import User from '../models/user';

const UserController = {
  addUser(req, res) {
    if (Object.keys(req.body).length === 0) {
      return res.status(204).send({
        message: 'Please provide all relevant information',
      });
    }
    const data = fs.readFileSync(path.join(`${__dirname}/../database/userDatabase.json`));
    if (!data.toString()) {
      return res.status(500).send({ message: 'Sever Error' });
    }
    const user = JSON.parse(data);
    if (
      req.body.id !== '' &&
      req.body.name !== '' &&
      req.body.price !== '' &&
      req.body.image !== '' &&
      req.body.isChecked !== ''
    ) {
      const newUser = new User(
        req.body.id,
        req.body.fullName,
        req.body.email,
        req.body.phoneNumber,
        req.body.password,
      );
      const filter = user.data.filter(checkName => checkName.fullName === req.body.fullName);
      if (filter.length === 0) {
        user.data.push(newUser);
        const userDatabaseUpdate = JSON.stringify(user, null, 2);
        return fs.writeFile(
          path.join(`${__dirname}/../database/userDatabase.json`),
          userDatabaseUpdate,
          (err) => {
            if (err) {
              return res.status(400).send({ message: 'User not added successfully' });
            }
            return res.status(201).send({ data: newUser });
          },
        );
      }
      return res.status(409).send({ message: 'User already exist' });
    }
    return res.status(206).send({ message: 'Please provide all required field' });
  },
  logInUser(req, res) {
    const data = fs.readFileSync(path.join(`${__dirname}/../database/userDatabase.json`));
    if (!data.toString()) {
      return res.status(500).send({ message: 'Sever Error' });
    }
    const userDatabase = JSON.parse(data);
    const filter = userDatabase.data.filter(checkName => (
      checkName.email === req.body.email &&
      checkName.password === req.body.password));
    if (filter.length === 1) {
      return res.status(200).send({ data: filter[0], message: 'Login successful' });
    }
    return res.status(401).send({ message: 'Login unsuccessful' });
  },
};

export default UserController;
