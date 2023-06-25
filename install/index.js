import fs from 'fs';
import { resolve } from 'path';

const dirs = [
  'log', 'upload', 'tmp',
];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(resolve(process.cwd(), dir), { recursive: true });
});
