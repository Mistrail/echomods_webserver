import { Router } from 'express';

const router = new Router();

router.post('/signin', (req, res) => {
  res.send({ status: 'Ok' });
});

router.post('/signup', (req, res) => {
  res.send({ status: 'Ok' });
});

router.post('/confirm', (req, res) => {
  res.send({ status: 'Ok' });
});

router.post('/restore', (req, res) => {
  res.send({ status: 'Ok' });
});

export default router;
