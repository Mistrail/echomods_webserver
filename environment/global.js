import { config } from 'dotenv';
// import logger from './logger/logger.js';

config();

process.on('uncaughtException', (err) => {
  console.error(err);
});

// global.d = logger.info;
