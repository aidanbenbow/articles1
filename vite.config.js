
import { defineConfig } from 'vite';

export default defineConfig({
    root: 'client/src',

    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,

        proxy: {
            '/api': {
                target: 'http://localhost:7000',
                changeOrigin: true
            },
            '/ping': {
                target: 'http://localhost:7000',
                changeOrigin: true
            }
        }
    },

    build: {
        outDir: '../../dist',
        emptyOutDir: true
    }
});
