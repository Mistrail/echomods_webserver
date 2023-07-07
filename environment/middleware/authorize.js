import { createContext } from 'context';
import User from '../../db/models/User.js';
import HttpError from '../errors/HttpError.js';

export default (req, res, next) => {
  if (req.headers['x-application-token'] !== process.env.APPLICATION_TOKEN) {
    throw new HttpError('APPLICATION_NOT_AUTH', 403, res);
  }

  try {
    req.user = createContext(User.verifyToken(req.headers['x-access-token']));
  } catch (e) {
    req.user = createContext(null);
  }
  next();
};
