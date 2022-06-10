import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: true,
    // generate stats file while ANALYZE_DUMP exist
    generateStatsFile: false,
    statsFilename: 'stats.json',
    logLevel: 'info',
    defaultSizes: 'parsed', // stat  // gzip
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/hero',
          component: '@/pages/hero',
        },
        {
          path: '/item',
          component: '@/pages/item',
        },
        {
          path: '/summoner',
          component: '@/pages/summoner',
        },
        {
          path: '/herodetail/:ename',
          component: '@/pages/herodetail/[ename]',
        }
      ],
    },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: false
  },
  proxy: {
    '/api/': {
      'target': 'https://pvp.qq.com/',
      'changeOrigin': true,
      'pathRewrite': { "^/api/": '' }
    }
  }
  // antd: {}
});
