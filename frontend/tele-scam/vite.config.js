import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Default development server port
    // Enable SPA fallback for React Router
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist', // Directory for the production build
  },
  resolve: {
    alias: {
      '@': '/src', // Shortcut for imports
    },
  },
  preview: {
    // Ensure the fallback for production preview as well
    historyApiFallback: true,
  },
});
