import AutoImport from 'unplugin-auto-import/vite';

export default () => {
  return AutoImport({
    dts: 'src/typings/auto-imports.d.ts',
    imports: ['vue', 'uni-app']
  });
};
