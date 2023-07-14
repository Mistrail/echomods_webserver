import '../environment/global.js';
import fs from 'fs';
import { resolve } from 'path';
import User from '../db/models/User.js';
import Personal from '../db/models/Personal.js';
import Role from '../db/models/Role.js';

const dirs = [
  'log', 'upload', 'tmp',
];

const force = true;

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(resolve(process.cwd(), dir), { recursive: true });
});

(async () => {
  await User.sync({ force }).catch(console.error);
  await Personal.sync({ force }).catch(console.error);
  await Role.sync({ force }).catch(console.error);
})().catch(console.error);
