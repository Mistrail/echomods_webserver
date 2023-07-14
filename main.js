import './environment/global.js';
import './environment/logger/logger.js';
import multer from 'multer';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import upload from './routes/upload.js';
import auth from './routes/auth.js';
import user from './routes/user.js';
import catalog from './routes/catalog/index.js';
import authorize from './environment/middleware/authorize.js';
import responseWrapper from './environment/middleware/responseWrapper.js';
import HttpResponse from './environment/httpResponse.js';
import HttpStatus from './environment/httpStatus.js';

const jsonParser = bodyParser.json();

const uploader = multer({
  dest: './tmp',
});

const app = express();

app
  .use(responseWrapper)
  .use(cors())
  .use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .use(jsonParser)
  .use(authorize);

app.post('/upload', uploader.single('upload'), upload);
app.use('/auth', auth);
app.use('/user', user);
app.use('/catalog', catalog);

app.listen(80);
app.use((req, res) => {
  res.sendResponse(new HttpResponse(HttpStatus.NOT_FOUND));
});
