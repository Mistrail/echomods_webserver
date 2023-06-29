import { config } from 'dotenv';
import logger from './logger/logger.js';

config();

global.d = logger.info;
