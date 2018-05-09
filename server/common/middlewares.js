import { verifyToken } from '../common/token';
import models from '../models';

export const checkUserRole = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: 'Please provide a valid token' });
  }
  const decoded = verifyToken(token);
  const { email, role } = decoded;
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
      req.decoded = decoded;
      return next();
    })
    .catch(err => res.status(500).send({ message: 'Error found in server', data: err.message }));
};

export const checkAuthenticatedUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: 'Please provide a valid token' });
  }
  const decoded = verifyToken(token);
  const { email } = decoded;
  return models.user
    .findOne({
      where: { email },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User account does not exist' });
      }
      req.decoded = decoded;
      return next();
    })
    .catch(err => res.status(500).send({ message: 'Error found in server', data: err.message }));
};
