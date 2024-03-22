import { defineConfig, loadEnv } from 'vite';
import { getEnvPath, getRootPath, getSrcPath, setupVitePlugins } from './build';

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const rootPath = getRootPath();
  const srcPath = getSrcPath();
  const envPath = getEnvPath();

  const viteEnv = loadEnv(configEnv.mode, envPath) as unknown as ImportMetaEnv;

  return {
    base: viteEnv.VITE_BASE_URL,
    envDir: './env',
    plugins: setupVitePlugins(viteEnv),
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
      }
    },
    server: {
      host: '0.0.0.0',
      port: 4200
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DELETE_CONSOLE === 'true',
          drop_debugger: viteEnv.VITE_DELETE_CONSOLE === 'true'
        }
      }
    }
  };
});
