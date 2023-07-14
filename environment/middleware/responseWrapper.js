import HttpResponse from '../httpResponse.js';

export default (req, res, next) => {
  res.sendResponse = (response = new HttpResponse()) => {
    res.status(response.status.code).send(response);
  };
  next();
};
