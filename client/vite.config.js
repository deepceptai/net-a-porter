import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // makes it accessible outside the container
    port: 5173,        // must match docker-compose.yml
    strictPort: true,
    watch: {
      usePolling: true, // optional but helps inside Docker on Windows/Mac
    },
  },
});
