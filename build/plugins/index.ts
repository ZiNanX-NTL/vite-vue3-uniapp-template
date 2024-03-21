import type { PluginOption } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import unocss from 'unocss/vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import uniHelpers from './uni-helper';
import autoImport from './unpluginAutoImport';
import icons from './unpluginIcons';
import svgIcons from './vitePluginSvgIcons';
import visualizer from './visualizer';
import compress from './compress';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function setupVitePlugins(viteEnv: ImportMetaEnv): (PluginOption | PluginOption[])[] {
  const plugins = [
    ...uniHelpers(viteEnv),
    uni(),
    unocss(),
    autoImport(),
    icons(viteEnv),
    svgIcons(viteEnv),
    vueSetupExtend()
  ];
  if (viteEnv.VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer as PluginOption);
  }
  if (viteEnv.VITE_COMPRESS === 'Y') {
    plugins.push(compress(viteEnv));
  }
  return plugins;
}
