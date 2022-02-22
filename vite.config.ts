import { defineConfig } from 'vite';
import { getConfig } from './build/config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return getConfig({ command, mode });
});
