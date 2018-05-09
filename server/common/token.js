import jwt from 'jsonwebtoken';

export const generateToken = data => jwt.sign(data, process.env.secret, { expiresIn: '24h' });

export const verifyToken = token => jwt.verify(token, process.env.secret);
