import { Router } from 'express';
import User from '../db/models/User.js';
import sendmail from '../environment/email/sendmail.js';
import authConfirmation from '../environment/email/templates/authConfirmation.js';
import httpStatus from '../environment/httpStatus.js';
import customStatus from '../environment/customStatus.js';
import HttpResponse from '../environment/httpResponse.js';
import RoleTypes from '../environment/roleTypes.js';

const router = new Router();

router.post('/signin', async ({ body }, res) => {
  const { login, password } = body;
  try {
    const user = await User.check({ login, password });
    const response = new HttpResponse(customStatus.OK, { token: await user.getToken() });
    res.sendResponse(response);
  } catch (e) {
    const response = new HttpResponse(customStatus.INVALID_EMAIL);
    res.sendResponse(response);
  }
});

router.post('/signup', async ({ body }, res) => {
  const { login, password, personal = {} } = body;
  try {
    const user = await User.create({
      login, password, Personal: personal, Roles: { role: RoleTypes.USER },
    }, {
      include: [
        { association: User.Personal },
        { association: User.Roles },
      ],
    });
    const response = new HttpResponse(customStatus.OK, { token: await user.getToken() });
    res.sendResponse(response);
  } catch (e) {
    console.log(e);
    res.sendResponse(new HttpResponse(httpStatus.BAD_REQUEST));
  }
});

router.post('/confirm', async (req, res) => {
  const restoreToken = req.body.restore;
  try {
    const tokenData = await User.verifyToken(restoreToken);
    const user = await User.findByPk(tokenData.id);
    if (!user) {
      res.sendResponse(new HttpResponse(customStatus.INVALID_EMAIL));
    } else {
      const response = new HttpResponse(customStatus.OK.message, { token: await user.getToken() });
      res.sendResponse(response);
    }
  } catch (e) {
    res.sendResponse(new HttpResponse(customStatus.INVALID_TOKEN));
  }
});

router.post('/restore', async ({ body }, res) => {
  try {
    const user = await User.findOne({ where: { login: body.email } });
    if (!user) {
      res.sendResponse(new HttpResponse(customStatus.INVALID_EMAIL));
    } else {
      const email = authConfirmation({ token: await user.getRestoreToken() });
      const sent = await sendmail({
        headers: {
          to: body.email,
          subject: email.subject,
        },
        body: email.body,
      });
      const response = new HttpResponse(customStatus.OK.message, sent);
      res.send(response);
    }
  } catch (e) {
    res.sendResponse(customStatus.INVALID_EMAIL);
  }
});

export default router;
