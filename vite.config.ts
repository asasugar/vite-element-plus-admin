import { defineConfig } from 'vite';
import { getConfig } from './build';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return getConfig({ command, mode });
});
