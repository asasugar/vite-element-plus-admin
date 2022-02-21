import { resolve } from 'path';

export function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
