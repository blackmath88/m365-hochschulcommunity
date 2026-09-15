import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        resources: resolve(__dirname, 'resources/index.html'),
        quickguide: resolve(__dirname, 'resources/open-source-quickguide/index.html'),
        useCase: resolve(__dirname, 'use-case/index.html'),
        openSource: resolve(__dirname, 'materials/open-source/index.html'),
        governance: resolve(__dirname, 'materials/m365-governance/index.html')
      }
    }
  }
});
