import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load all `.env` variables for the given mode into `env`
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Tell Vite that this app will be served under `/analyzer/`
    base: '/analyzer/',

    // Register the React plugin so TSX → JS is compiled
    plugins: [react()],

    define: {
      // Expose your GEMINI_API_KEY as `process.env.GEMINI_API_KEY`
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        // If you use `@/` as a shortcut to the project root, keep this
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
