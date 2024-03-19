import type { PluginOption } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import uniHelpers from './uni-helper';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  console.log(viteEnv);
  const plugins = [...uniHelpers(), uni()];
  return plugins;
}
