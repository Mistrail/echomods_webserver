import httpStatus from './httpStatus.js';

export default {
  INVALID_TOKEN: {
    code: httpStatus.BAD_REQUEST.code,
    message: 'INVALID_TOKEN',
  },
  INVALID_EMAIL: {
    code: httpStatus.BAD_REQUEST.code,
    message: 'INVALID_EMAIL',
  },
  OK: {
    code: httpStatus.OK.code,
    message: 'OK',
  },
  APPLICATION_NOT_AUTH: {
    code: httpStatus.UNAUTHORIZED.code,
    message: 'APPLICATION_NOT_AUTH',
  },
};
