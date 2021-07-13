/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 */

export default {
  dev: {},
  yapi: {
    '/material': {
      target: 'https://api.12313.com/mock/2545',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  rd: {
    '/service': {
      // rd机器地址
      // target: 'http://172.23.68.35:8080',
      target: 'http://172.23.66.253:8080',
      // target: 'http://172.16.11.145:32628',
      pathRewrite: { '^/service/material': '' },
      changeOrigin: true,
    },
  },
  test: {
    '/material': {
      target: 'https://test-material.gaotu100.com',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  beta: {
    '/material': {
      target: '替换成beta环境的地址',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  prod: {
    '/material': {
      target: '替换成线上环境的地址',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
