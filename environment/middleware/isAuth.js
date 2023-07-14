import HttpResponse from '../httpResponse.js';
import HttpStatus from '../httpStatus.js';

export default (req, res, next) => {
  if (req.user.use()) {
    next();
  } else {
    res.sendResponse(new HttpResponse(HttpStatus.UNAUTHORIZED));
  }
};
