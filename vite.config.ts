import { defineConfig } from 'vite';
import config from './build/config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  return config;
});
