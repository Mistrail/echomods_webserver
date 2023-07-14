import { createContext } from 'context';
import User from '../../db/models/User.js';
import HttpResponse from '../httpResponse.js';
import customStatus from '../customStatus.js';

export default (req, res, next) => {
  if (req.headers['x-application-token'] !== process.env.APPLICATION_TOKEN) {
    res.sendResponse(new HttpResponse(customStatus.APPLICATION_NOT_AUTH));
  }

  try {
    req.user = createContext(User.verifyToken(req.headers['x-access-token']));
  } catch (e) {
    req.user = createContext(null);
  }
  next();
};
