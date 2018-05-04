import jwt from 'jsonwebtoken';

export const generateToken = (data) => {
  return jwt.sign(data, process.env.secret, { expiresIn: '24h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.secret);
};
