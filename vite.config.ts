import { defineConfig } from 'vite';
import { generateDynamicComponents } from './build/generate';
import config from './build/config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode);
  generateDynamicComponents();
  return config;
});
