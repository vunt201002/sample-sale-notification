import {defineConfig, transformWithEsbuild} from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

let hmrConfig;
if (host === 'localhost') {
  hmrConfig = {
    protocol: 'ws',
    host: 'localhost',
    port: 64999,
    clientPort: 64999
  };
} else {
  hmrConfig = {
    protocol: 'wss',
    host: host,
    port: process.env.FRONTEND_PORT,
    clientPort: 443
  };
}

const proxyOptions = {
  target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
  changeOrigin: false,
  secure: true,
  ws: false
};

const host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, '') : 'localhost';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        // Use the exposed transform from vite, instead of directly
        // transforming with esbuild
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic'
        });
      }
    },
    react()
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src'),
      '@functions': path.resolve(__dirname, '../functions/src')
    }
  },
  server: {
    host: 'localhost',
    port: process.env.FRONTEND_PORT,
    hmr: hmrConfig,
    proxy: {
      '^/(\\?.*)?$': proxyOptions,
      '^/api(/|(\\?.*)?$)': proxyOptions
    }
  }
});
