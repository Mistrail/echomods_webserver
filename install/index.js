import fs from 'fs';
import { resolve } from 'path';
import sequelize from '../db/models/index.js';

const dirs = [
  'log', 'upload', 'tmp',
];

sequelize.sync().then(() => {
  console.log('MySQL sync complete');
});

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(resolve(process.cwd(), dir), { recursive: true });
});
