import { Router } from 'express';
import HttpResponse from '../../environment/httpResponse.js';
import HttpStatus from '../../environment/httpStatus.js';

const router = new Router();

router.get('/', (req, res) => {
  res.sendResponse(new HttpResponse(HttpStatus.OK));
});

export default router;
