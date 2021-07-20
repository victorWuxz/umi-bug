
import {defineConfig} from 'umi';
import path from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const {REACT_APP_ENV, APP_TYPE, NODE_ENV, SERVE_ENV} = process.env;

// 项目配置，具体配置请参考：https://umijs.org/zh-CN/config
export default defineConfig({
    hash: NODE_ENV === 'production',
    layout: {
        name: defaultSettings.title,
        siderWidth: 208,
        locale: defaultSettings.menu?.locale
    },
    targets: {
        ie: 11,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    nodeModulesTransform: {
        type: 'none',
    },
    devtool: NODE_ENV === 'development' ? 'eval' : 'cheap-module-source-map',
    base: '/',
    outputPath: 'material',
    define: {
        APP_TYPE: APP_TYPE || '',
        REACT_APP_ENV: REACT_APP_ENV || '',
        // CASTOKEN: CASTOKEN || '',
        NODE_ENV: NODE_ENV,
        SERVE_ENV: SERVE_ENV,
    },
    routes: [
        {
            path: '/',
            name: '首页',
            component: './index'
        },
        {
            path: '/test',
            name: '测试',
            component: './test'
        },
        {
            path: '/test2',
            name: '测试2',
            component: './test2'
        },
    ],
    theme: {
        // ...darkTheme,
        'primary-color': defaultSettings.primaryColor,
        'font-size-base': '12px'
    },
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
    },
    scripts: [
        // @ts-ignore
        {src: 'https://unpkg.com/react@17/umd/react.production.min.js', crossorigin: 'anonymous'},
        {src: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js', crossorigin: 'anonymous'},
    ],
    // @ts-ignore
    proxy: proxy[SERVE_ENV || 'dev'],
    webpack5: NODE_ENV === 'development' ? {} : false,
    mfsu: NODE_ENV === 'development' ? {
        chunks: ['vendors', 'umi'],
        development: {
            output: path.resolve(__dirname, '/cache/.mfsu')
        }
    } : false,
    chunks: ['vendors', 'umi'],
    chainWebpack(memo) {
        // memo.plugin('dayjsPlugin').use(AntdDayjsWebpackPlugin);
        // 高途魔方
        memo.merge({
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    minSize: 30000,
                    minChunks: 1,
                    automaticNameDelimiter: '.',
                    cacheGroups: {
                        vendor: {
                            name: 'vendors',
                            test({resource}) {
                                return /[\\/]node_modules[\\/]/.test(resource);
                            },
                            priority: 10,
                        },
                    },
                },
            }
        });
    }
});
