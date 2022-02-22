import { resolve } from 'path';

export function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
