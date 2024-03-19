// @see https://uni-helper.js.org/vite-plugin-uni-pages
import UniPages from '@uni-helper/vite-plugin-uni-pages';
// @see https://uni-helper.js.org/vite-plugin-uni-layouts
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts';
// @see https://github.com/uni-helper/vite-plugin-uni-platform
// 需要与 @uni-helper/vite-plugin-uni-pages 插件一起使用
import UniPlatform from '@uni-helper/vite-plugin-uni-platform';
// @see https://github.com/uni-helper/vite-plugin-uni-manifest
import UniManifest from '@uni-helper/vite-plugin-uni-manifest';
// @see https://github.com/uni-helper/vite-plugin-uni-components
import Components from '@uni-helper/vite-plugin-uni-components';

export default function uniHelpers() {
  return [
    UniPages({
      dts: 'src/typings/uni-pages.d.ts',
      exclude: ['**/components/**/**.*', '**/my/**/**.vue'],
      routeBlockLang: 'json5', // 虽然设了默认值，但是vue文件还是要加上 lang="json5", 这样才能很好地格式化
      homePage: 'pages/index/index',
      subPackages: ['src/pages-sub'] // 是个数组，可以配置多个
    }),
    UniLayouts(),
    UniPlatform(),
    UniManifest(),
    Components({
      dts: 'src/typings/components.d.ts'
    })
  ];
}
