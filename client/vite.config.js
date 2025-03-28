import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Use this instead of --host flag
    port: 5173,
    watch: {
      usePolling: true, // Needed for Docker container
    },
  },
});
