import '../environment/global.js';
import fs from 'fs';
import { resolve } from 'path';
import User from '../db/models/User.js';
import Personal from '../db/models/Personal.js';

const dirs = [
  'log', 'upload', 'tmp',
];

User.sync().catch(console.error);
Personal.sync().catch(console.error);

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(resolve(process.cwd(), dir), { recursive: true });
});
