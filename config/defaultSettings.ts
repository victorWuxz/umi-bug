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
    title: 'test',
    pwa: false,
    iconfontUrl: '',
    domainName: 'test',
    projectId: 'test',
    projectName: 'test',
} as LayoutSettings & {
    pwa: boolean;
    domainName: string;
    projectId: string;
    projectName: string;
};
