import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
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
      'pathRewrite': {"^/api/": ''}
    }
  }
  // antd: {}
});
