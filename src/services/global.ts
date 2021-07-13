import {request} from 'umi';


// @ts-ignore
const prefix = SERVE_ENV === 'rd' ? '/service' : '';

export function fetchAreaList(params = {}) {
    return request('/material/attribute/area/listByParentId', {
        method: 'POST',
        prefix,
        data: {
            ...params,
        },
    });
}

export function fetchSchoolList(params = {}) {
    return request('/material/attribute/school/listByCondition', {
        method: 'POST',
        prefix,
        data: {
            ...params,
        },
    });
}

export function fetchClazzOptions(params = {}) {
    return request('/material/attribute/clazz/basicProvider', {
        method: 'POST',
        prefix,
        data: {
            ...params,
        },
    });
}

const suffix = [
    'doc',
    'docx',
    'xls',
    'xlsx',
    'ppt',
    'pptx',
    'txt',
    'pdf',
    'xmind',
    'DOC',
    'DOCX',
    'XLS',
    'XLSX',
    'PPT',
    'PPTX',
    'TXT',
    'PDF',
    'XMIND'
];


export const downloadSingleFile = (path: string, name: string, number:string) => new Promise((resolve, reject) => {
    request(path, {
        method: 'GET',
        responseType: 'blob',
        timeout: 0,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }).then(res => {
        const blob = new Blob([res]);
        const objectURL = URL.createObjectURL(blob);
        const format = path?.split('.')[path.split('.')?.length - 1];
        const hasFormat = name?.indexOf('.') > 0 && suffix?.includes(name?.split('.')[name?.split('.')?.length - 1]);
        const downloadName = hasFormat ? name : `${name}.${format}`;
        // saveAs(blob, downloadName);
        const btn = document.createElement('a');
        btn.download = downloadName;
        btn.href = objectURL;
        document.body.appendChild(btn);
        btn.click();
        document.body.removeChild(btn);
        URL.revokeObjectURL(objectURL);
        resolve(name);
    })
        .catch(e => {
            reject(number);
        });
});

// 批量下载准备函数
export const downloadFile = (path: string, name: string) => request(path, {
    method: 'GET',
    responseType: 'blob',
    timeout: 0
}).then(res => {
    const blob = new Blob([res]);
    const objectURL = URL.createObjectURL(blob);
    const format = path?.split('.')[path.split('.')?.length - 1];
    const hasFormat = name?.indexOf('.') > 0 && suffix?.includes(name?.split('.')[name?.split('.')?.length - 1]);
    const downloadName = hasFormat ? name : `${name}.${format}`;
    return {
        downloadName,
        downloadUrl: objectURL
    };
});

// 批量下载
export const downloadFiles = (datas: {path: string; name: string}[]) => {
    const promises = [];
    datas.forEach(item => {
        promises.push(downloadFile(item.path, item.name));
    });
    return Promise.all(promises).then(btns => {
        btns.forEach(item => {
            const {downloadName, downloadUrl} = item;
            const btn = document.createElement('a');
            btn.download = downloadName;
            btn.href = downloadUrl;
            btn.click();
            URL.revokeObjectURL(downloadUrl);
        });
    });
};
