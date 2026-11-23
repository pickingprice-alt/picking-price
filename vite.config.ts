import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';

const define={'process.env.GOOGLE_MAPS_KEY':JSON.stringify(process.env.GOOGLE_MAPS_KEY||'')};

export default defineConfig({
  root: resolve('client'),
  publicDir: resolve('public'),
  plugins: [
    react(),
    {
      name: 'inject-botpress',
      transformIndexHtml() {
        return [
          {
            tag: 'script',
            attrs: { src: 'https://cdn.botpress.cloud/webchat/v5.0/inject.js' },
            injectTo: 'body'
          },
          {
            tag: 'script',
            attrs: { 
              src: 'https://files.bpcontent.cloud/2026/11/23/13/20261123133015-C6I6ABV7.js',
              defer: true 
            },
            injectTo: 'body'
          }
        ];
      }
    }
  ],
  define,
  resolve: { alias: { '@': resolve('.') } },
  build: { outDir: resolve('server/public'), emptyOutDir: true }
});
