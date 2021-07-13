import {Settings as LayoutSettings} from '@ant-design/pro-layout';

export default {
    navTheme: 'realDark',
    // 拂晓蓝
    primaryColor: '#2266FF',
    layout: 'side',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    menu: {
      locale: false,
      defaultOpenAll: false,
    },
    title: '高途资料库',
    pwa: false,
    iconfontUrl: '',
    domainName: 'gaotu100',
    projectId: 'gaotu-fe-material',
    projectName: '高途资料库',
} as LayoutSettings & {
    pwa: boolean;
    domainName: string;
    projectId: string;
    projectName: string;
};
