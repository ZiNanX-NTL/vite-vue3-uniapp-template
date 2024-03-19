import { defineConfig, loadEnv } from 'vite';
import { getEnvPath, getRootPath, getSrcPath, setupVitePlugins } from './build';

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const rootPath = getRootPath();
  const srcPath = getSrcPath();
  const envPath = getEnvPath();

  const viteEnv = loadEnv(configEnv.mode, envPath) as unknown as ImportMetaEnv;
  console.log(viteEnv, rootPath, srcPath);
  console.log(process.env.UNI_PLATFORM); // 得到 mp-weixin, h5 等

  return {
    envDir: './env',
    plugins: setupVitePlugins(viteEnv)
  };
});
