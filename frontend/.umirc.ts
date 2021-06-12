import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/phone', component: '@/pages/phone' },
    { path: '/phone/create', component: '@/pages/phone/create' },
  ],
  fastRefresh: {},
  ssr: {}
});
