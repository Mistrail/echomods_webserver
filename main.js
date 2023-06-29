import './environment/global.js';
import './environment/logger/logger.js';
import multer from 'multer';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import upload from './routes/upload.js';
import auth from './routes/auth.js';
import user from './routes/user.js';
import catalog from './routes/catalog.js';
import HttpError from './environment/errors/HttpError.js';
import context from './environment/middleware/authorize.js';

const jsonParser = bodyParser.json();

const uploader = multer({
  dest: './tmp',
});

const app = express();

app
  .use(cors())
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .use(jsonParser)
  .use(context);

app.post('/upload', uploader.single('upload'), upload);
app.use('/auth', auth);
app.use('/user', user);
app.use('/catalog', catalog);

app.listen(80);
app.use((req, res) => {
  throw new HttpError('NOT_FOUND', 404, res);
});
