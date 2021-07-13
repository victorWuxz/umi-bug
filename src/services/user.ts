import {request} from 'umi';

export function getAuth(params = {}) {
    return request('/material/attribute/getAuth', {
        method: 'POST',
        // @ts-ignore
        data: {
            ...params,
        },
    });
}

export function getBusinessLine(params = {}) {
    return request('/material/attribute/getBusinessLine', {
        method: 'POST',
        // @ts-ignore
        data: {
            ...params,
        },
    });
}

export function getUser(params = {}) {
    return Promise.all([getAuth(params), getBusinessLine(params)]);
}

export function logout(params = {}) {
    return request('/material/ac/logout', {
        // @ts-ignore
        method: 'POST',
        data: params
    });
}
