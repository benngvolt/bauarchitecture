import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    // Les pictogrammes .svg importés avec « ?react » deviennent des composants React.
    svgr(),
  ],
  server: {
    port: 3000,
  },
  build: {
    // Même dossier de sortie qu'avec Create React App : Dockerfile et nginx.conf n'ont pas à changer.
    outDir: 'build',
  },
});
