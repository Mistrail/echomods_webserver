import { Router } from 'express';
import HttpStatus from '../environment/httpStatus.js';
import HttpResponse from '../environment/httpResponse.js';
import isAuth from '../environment/middleware/isAuth.js';
import User from '../db/models/User.js';
import Personal from '../db/models/Personal.js';
import authConfirmation from '../environment/email/templates/authConfirmation.js';
import sendmail from '../environment/email/sendmail.js';
import customStatus from '../environment/customStatus.js';
import RoleTypes from '../environment/roleTypes.js';
import Role from '../db/models/Role.js';

const router = new Router();

router.use(isAuth);

router.get('/', async (req, res) => {
  const user = await User.scope(User.scopes.PUBLIC).findByPk(req.user.use().id);
  res.sendResponse(new HttpResponse(HttpStatus.OK, user));
});

router.delete('/', async (req, res) => {
  const user = await User.findByPk(req.user.use().id);
  await user.destroy();
  res.sendResponse(new HttpResponse(HttpStatus.OK));
});

router.put('/', async (req, res) => {
  const fk = Personal.User().foreignKey;
  const userId = req.user.use().id;
  const personal = await Personal.findOne({ where: { [fk]: userId } });
  await personal.update(req.body);
  res.sendResponse(new HttpResponse(HttpStatus.OK, personal));
});

router.patch('/changeemail', async (req, res) => {
  const user = await User.findByPk(req.user.use().id);
  const email = authConfirmation({ token: user.getRestoreToken() });
  try {
    await user.update({ login: req.body.email });
    sendmail({
      headers: {
        to: req.body.email,
        subject: email.subject,
      },
      body: email.body,
    });
    res.sendResponse(new HttpResponse(HttpStatus.OK));
  } catch (e) {
    res.sendResponse(new HttpResponse(customStatus.INVALID_EMAIL));
  }
});

router.patch('/changepass', async (req, res) => {
  const user = await User.findByPk(req.user.use().id);
  const email = authConfirmation({ token: user.getRestoreToken() });

  try {
    await user.update({ password: req.body.password });
    sendmail({
      headers: {
        to: user.login,
        subject: email.subject,
      },
      body: email.body,
    });
    res.sendResponse(new HttpResponse(HttpStatus.OK));
  } catch (e) {
    res.sendResponse(new HttpResponse(HttpStatus.BAD_REQUEST));
  }
});

router.patch('/role', async (req, res) => {
  const userId = req.user.use().id;
  const roleType = RoleTypes[req.body.role] ?? false;
  if (!roleType) {
    res.sendResponse(new HttpResponse(HttpStatus.BAD_REQUEST));
  } else {
    const role = await Role.upsert({ [User.Roles.foreignKey]: userId, role: roleType });
    res.sendResponse(new HttpResponse(HttpStatus.OK, role));
  }
});

router.delete('/role', async (req, res) => {
  const userId = req.user.use().id;
  const roleType = RoleTypes[req.body.role] ?? false;
  if (!roleType || roleType === RoleTypes.USER) {
    res.sendResponse(new HttpResponse(HttpStatus.BAD_REQUEST));
  } else {
    const role = await Role.findOne({ where: { [User.Roles.foreignKey]: userId, role: roleType } });
    await role.destroy();
    res.sendResponse(new HttpResponse(HttpStatus.OK, role));
  }
});

export default router;
