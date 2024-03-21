import { visualizer } from 'rollup-plugin-visualizer';

export default visualizer({
  filename: './node_modules/.cache/visualizer/stats.html',
  gzipSize: true,
  brotliSize: true,
  open: true
});
