import { Router } from 'express';
import User from '../db/models/User.js';
import HttpError from '../environment/errors/HttpError.js';

const router = new Router();

router.post('/signin', async (req, res) => {
  const { login, password } = req.body;
  try {
    const user = await User.check({ login, password });
    res.send({ token: await user.getToken() });
  } catch (e) {
    throw new HttpError('INVALID_REQUEST', 401, res);
  }
});

router.post('/signup', async (req, res) => {
  const { login, password, Personal = {} } = req.body;
  try {
    const user = await User.create({ login, password, Personal }, {
      include: [{
        association: User.Personal(),
      }],
    });
    res.send({ token: await user.getToken() });
  } catch (e) {
    console.log(e);
    throw new HttpError('INVALID_REQUEST', 401, res, { cause: e.message });
  }
});

router.post('/confirm', (req, res) => {
  res.send({ status: 'Ok' });
});

router.post('/restore', (req, res) => {
  res.send({ status: 'Ok' });
});

export default router;
