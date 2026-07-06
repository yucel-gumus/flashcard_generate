import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const gatewayTarget = (env.AI_API_URL || env.GEMINI_GATEWAY_URL || 'https://python-backend-270384591051.europe-west3.run.app').replace(
    /\/$/,
    ''
  );

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        '/api/generate': {
          target: gatewayTarget,
          changeOrigin: true,
          secure: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              const key = env.GATEWAY_CLIENT_API_KEY || env.CLIENT_API_KEY;
              if (key) {
                proxyReq.setHeader('X-API-Key', key);
              }
            });
          },
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  };
});