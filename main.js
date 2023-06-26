import './environment/global.js';
import express from 'express';
import auth from './routes/auth.js';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/auth', auth);

app.listen(80);

(async () => {

})().catch(console.error);
