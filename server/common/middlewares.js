import { verifyToken } from '../common/token';
import models from '../models';

const checkUserRole = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: 'Please provide a valid token'});
  }
  const decoded = verifyToken(token);
  const { email, role } = decoded;
  return models.user
    .findOne({
      where: { email }
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User account does not exist'});
      }
      if (role !== 'caterer') {
        return res.status(403).send({ message: 'Access denied'});
      }
      return next();
    })
    .catch((err) => {
      return res.status(500).send({ message: 'Error found in server', data: err });
    });
};

export default checkUserRole;
