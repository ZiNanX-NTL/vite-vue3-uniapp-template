import type { Preset, UserConfig } from 'unocss';
import { defineConfig, presetAttributify, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss';
import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from 'unocss-applet';

const isH5 = process.env?.UNI_PLATFORM === 'h5';
const isMp = process.env?.UNI_PLATFORM?.startsWith('mp') ?? false;

const presets: Preset[] = [];
if (!isMp) {
  /**
   * you can add `presetAttributify()` here to enable unocss attributify mode prompt
   * although preset is not working for applet, but will generate useless css
   * 为了不生产无用的css,要过滤掉 applet
   */
  // 支持css class属性化，eg: `<button bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" text="sm white">attributify Button</button>`
  presets.push(presetAttributify());
}
if (!isH5) {
  presets.push(presetRemRpx());
}
export default defineConfig<UserConfig>({
  presets: [
    presetApplet({ enable: !isH5 }),
    ...presets,
    // 支持图标，需要搭配图标库，eg: @iconify-json/carbon, 使用 `<button class="i-carbon-sun dark:i-carbon-moon" />`
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-x-center': 'flex justify-center',
      'flex-y-center': 'flex items-center',
      'flex-vertical': 'flex flex-col',
      'flex-vertical-center': 'flex-center flex-col',
      'flex-vertical-stretch': 'flex-vertical items-stretch',
      'i-flex-center': 'inline-flex justify-center items-center',
      'i-flex-x-center': 'inline-flex justify-center',
      'i-flex-y-center': 'inline-flex items-center',
      'i-flex-vertical': 'inline-flex flex-col',
      'i-flex-vertical-stretch': 'i-flex-vertical items-stretch',
      'flex-1-hidden': 'flex-1 overflow-hidden'
    },
    {
      'absolute-lt': 'absolute left-0 top-0',
      'absolute-lb': 'absolute left-0 bottom-0',
      'absolute-rt': 'absolute right-0 top-0',
      'absolute-rb': 'absolute right-0 bottom-0',
      'absolute-tl': 'absolute-lt',
      'absolute-tr': 'absolute-rt',
      'absolute-bl': 'absolute-lb',
      'absolute-br': 'absolute-rb',
      'absolute-center': 'absolute-lt flex-center size-full',
      'fixed-lt': 'fixed left-0 top-0',
      'fixed-lb': 'fixed left-0 bottom-0',
      'fixed-rt': 'fixed right-0 top-0',
      'fixed-rb': 'fixed right-0 bottom-0',
      'fixed-tl': 'fixed-lt',
      'fixed-tr': 'fixed-rt',
      'fixed-bl': 'fixed-lb',
      'fixed-br': 'fixed-rb',
      'fixed-center': 'fixed-lt flex-center size-full'
    },
    {
      'nowrap-hidden': 'overflow-hidden whitespace-nowrap',
      'ellipsis-text': 'nowrap-hidden text-ellipsis'
    },
    {
      'transition-base': 'transition-all duration-300 ease-in-out',
      'card-wrapper': 'rd-8px shadow-sm'
    }
  ],
  transformers: [
    // 启用 @apply 功能
    transformerDirectives(),
    // 启用 () 分组功能
    // 支持css class组合，eg: `<div class="hover:(bg-gray-400 font-medium) font-(light mono)">测试 unocss</div>`
    transformerVariantGroup(),
    // Don't change the following order
    transformerAttributify({
      // 解决与第三方框架样式冲突问题
      prefixedOnly: true,
      prefix: 'fg'
    }),
    transformerApplet()
  ],
  rules: [
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
      }
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }]
  ]
});

/**
 * 最终这一套组合下来会得到：
 * mp 里面：mt-4 => margin-top: 32rpx
 * h5 里面：mt-4 => margin-top: 1rem
 */
