
import {defineConfig} from 'umi';
import path from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
// import gctjson from '../gct.env.json';

const CubePlugin = require('@gaotu-fe/webpack-cube-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const SentryPlugin = require('webpack-sentry-plugin');
const version = require('../package.json').version;
// const {projectId, projectName} = defaultSettings;
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
        }
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
        development: {
            output: path.resolve(__dirname, '/cache/.mfsu')
        }
    } : false,
    chainWebpack(memo) {
        // memo.plugin('dayjsPlugin').use(AntdDayjsWebpackPlugin);
        // 高途魔方
        if (REACT_APP_ENV === 'test') {
            memo.plugin('gaotu-cube').use(CubePlugin, [{
                name: 'gt-material',
                projectId: '9282',
                enable: true,
            }]);
        }
        if (REACT_APP_ENV === 'prod') {
            memo.plugin('sentry').use(SentryPlugin, [{
                organization: 'gaptu-web',
                project: 'material-pc',
                include: './material',
                baseSentryURL: 'https://sentry.baijia.com/',
                release: `${version}-${new Date().getTime()}`,
                deleteAfterCompile: true,
                apiKey: '8bba13f9b24742deacb20a83d7adc2964fb97c3fe093448cbbdc6f7445251de1',
            }]);
        }
    }
});
