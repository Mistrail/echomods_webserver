import { Router } from 'express';
import HttpResponse from '../../environment/httpResponse.js';
import HttpStatus from '../../environment/httpStatus.js';
import sections from './sections.js';
import items from './items.js';

const router = new Router();

router.get('/', (req, res) => {
  res.sendResponse(new HttpResponse(HttpStatus.OK));
});
router.get('/search', (req, res) => {
  const searchString = req.query.s;
  res.sendResponse(new HttpResponse(HttpStatus.FOUND, { search: searchString }));
});

router.use('/sections', sections);
router.use('/items', items);

export default router;
