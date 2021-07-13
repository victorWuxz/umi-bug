// 项目运行时配置
// 具体配置可参考：https://umijs.org/zh-CN/docs/runtime-config
/* eslint-disable require-await */
import React from 'react';
import {BasicLayoutProps, Settings as LayoutSettings} from '@ant-design/pro-layout';
import {notification} from 'antd';
import dayjs from 'dayjs';
import Cookie from 'js-cookie';
import {UseRequestProvider} from 'ahooks';
import 'dayjs/locale/zh-cn';
import {isSlave} from '@/utils/utils';

import {getUser} from '@/services/user';
import RightContent from '@/components/RightContent';
import defaultSettings from '../config/defaultSettings';


// 设置dayjs中文设置
dayjs.locale('zh-cn');


// @ts-ignore
if (CASTOKEN && NODE_ENV === 'development') {
    // @ts-ignore
    Cookie.set('_const_d_jsession_id_', CASTOKEN);
}

export function onRouteChange({matchedRoutes}) {
    if (matchedRoutes.length) {
        const matchedRoute = matchedRoutes[matchedRoutes.length - 1];
        if (matchedRoute.match?.isExact) {
            // pv埋点
            const {pvId} = matchedRoute.route;
            if (pvId) {
            }
        }
    }
}

// 项目初始化全局状态
// 具体配置可参考：https://umijs.org/zh-CN/plugins/plugin-initial-state
export async function getInitialState(): Promise<{
    currentUser: API.CurrentUser | null;
    settings?: LayoutSettings;
    hasPermissions?: string[];
    businessLine: number;
}> {
    try {
        const response = await getUser();
        const [userRes, businessRes] = response || [];
        const hasPermissions
            = userRes?.data?.currentRole
                ?.hasPermissions?.map((item: API.PermissionItem) => item.tag) || [];
        return {
            currentUser: userRes?.data || null,
            businessLine: businessRes?.data?.businessLine ?? null,
            hasPermissions,
            settings: defaultSettings,
        };
    }
    catch (error) {
    }
    return {
        settings: defaultSettings,
        currentUser: null,
        businessLine: null
    };
}

// 项目布局配置
// 具体配置可参考：https://umijs.org/zh-CN/plugins/plugin-layout
export const layout = ({
    initialState,
}: {
    initialState: {settings?: LayoutSettings};
}): BasicLayoutProps => {
    const layouts = {
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        footerRender: false,
        onError(error) {
        },
        ...initialState?.settings,
    } as BasicLayoutProps;
    if (isSlave) {
        layouts.headerRender = false;
        layouts.menuHeaderRender = false;
        layouts.menuRender = false;
    }
    return layouts;
};

// useRequest的全局配置
const Wrapper = ({children, routes}) => (
    <UseRequestProvider
        value={{
            formatResult(res) {
                const {data, pager} = res;
                if (pager) {
                    return {data, pager};
                }
                return data;
            }
        }}
    >
        {React.cloneElement(children, {
            ...children.props,
            routes,
        })}
    </UseRequestProvider>
);

export function rootContainer(container) {
    return React.createElement(Wrapper, null, container);
}

// request全局配置
// 具体配置可参考：https://umijs.org/zh-CN/plugins/plugin-request
const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: {response: Response; info: {errorMessage: string}}) => {
    const {response, info} = error;
    if (response?.status) {
        // @ts-ignore
        const errorText = codeMessage[response.status] || response.statusText;
        const {status, url} = response;
        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
        });
    }

    if (!response) {
        notification.error({
            message: info?.errorMessage || '您的网络发生异常，无法连接服务器',
        });
    }
    throw error;
};

export const request = {
    errorHandler,
    // @ts-ignore
    prefix: SERVE_ENV === 'rd' ? '/service' : '',
    // headers: {testEnvVersion:'update-ldc-version-coupons:{teacher-basic.gaotu100.com-cms-b.gaotu100.com}'},
    errorConfig: {
        adaptor(resData) {
            // 下载内容不拦截
            if (resData instanceof Blob) {
                return {
                    success: true
                };
            }
            return {
                ...(resData || {}),
                success: resData?.code === 0 || resData?.status === 200,
                errorMessage: resData?.msg,
            };
        },
    },
    responseInterceptors: [
        // @ts-ignore
        async function interceptors(res, options) {
            // 下载的不拦截
            if (options.responseType === 'blob') {
                return res;
            }
            const resp = await (res || {}).clone().json();
            const {code} = resp || {};
            if (code === 700) {
                window.location.href = `${window.location.origin}/material/main.do?referUrl=${location.origin}`;
            }
            return res || {};
        },
    ]
};
