import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/everything-generator/', // Set this to your new repo name for GitHub Pages
  build: {
    outDir: 'docs', // Output build to /docs
    emptyOutDir: true,
  },
});
