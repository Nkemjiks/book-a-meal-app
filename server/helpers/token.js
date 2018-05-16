import jwt from 'jsonwebtoken';

export const generateToken = data => jwt.sign(data, process.env.secret, { expiresIn: '24h' });

/**
 * @description Verify the token that has been provided by the user
 * @param  {Object} req - The object that returns a response
 * @param  {Object} res - The object that sends the request
 * @param  {Object} next - The object that tells the next action to take place
 * @returns {Object}
 */
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({ message: 'Please provide a valid token' });
  }
  return jwt.verify(token, process.env.secret, (err, decoded) => {
    if (!decoded) {
      return res.status(403).send({ message: 'Invalid Token' });
    }
    req.decoded = decoded;
    next();
    return null;
  });
};
