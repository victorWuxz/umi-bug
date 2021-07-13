import {SorterResult} from 'antd/es/table/interface.d';
import {FormatPaginationProps, TablePaginationConfig, OptionItem} from './utils.d';

export const pager2antd = (pager: FormatPaginationProps) => {
    const newPager = {} as TablePaginationConfig;
    Object.keys(pager || {}).forEach(key => {
        if (key !== 'pageNum' && key !== 'count') {
            // @ts-ignore
            newPager[key] = pager[key];
        }
    });
    return {
        current: pager?.pageNum,
        total: pager?.count,
        ...newPager,
    };
};

export const pager2serve = (pager: TablePaginationConfig) => ({
    pageNum: pager?.current,
    ...(pager || {})
});

export const formatOptions = (options: OptionItem[]) => options?.map(item => ({
    value: item.key,
    label: item.label
})) || [];

// 数字千分位处理，默认保留两位小数
export const thousandthNum = (number:number, precision = 2) => {
    if (isNaN(number)) {
        return number || '--';
    }
    return (+number).toLocaleString('zh', {
        maximumFractionDigits: precision || 2
    });
};

// 金额类数据处理，添加￥单位并千分位处理并默认保留两位小数
export const thousandthMoney = (number: number, precision = 2) => {
    if (isNaN(number)) {
        return number || '--';
    }
    return (+number).toLocaleString('zh', {
        maximumFractionDigits: precision || 2,
        style: 'currency',
        currency: 'CNY',
    });
};

// 率类数据处理，添加￥单位并千分位处理并默认保留两位小数
export const ratio2percent = (number: number, precision = 2) => {
    if (isNaN(number)) {
        return number || '--';
    }
    return (+number).toLocaleString('zh', {
        maximumFractionDigits: precision || 2,
        style: 'percent',
    });
};

// 单位为分的金额转换成元
export const fen2yuan = (money: number) => {
    if (isNaN(money)) {
        return money || '--';
    }
    return thousandthMoney(money / 100);
};

// 排序转化
export const convertSort = (antSortInfo: SorterResult<{}>, ascend = 1, descend = 2) => {
    const sortTypeMap = {
        ascend,
        descend,
    };
    const {order, field} = antSortInfo || {};
    return {
        sortType: order ? sortTypeMap[order] : undefined,
        sortField: order ? field : undefined
    };
};

// 排序转化(protable)
export const convertProSort = (proSortInfo:{}, ascend = 1, descend = 2) => {
    const sortTypeMap = {
        ascend,
        descend,
    };
    const sortParams = {} as {sortField?: string; sortType?:string};
    if (proSortInfo) {
        Object.keys(proSortInfo).forEach(key => {
            sortParams.sortField = key;
            sortParams.sortType = sortTypeMap[proSortInfo[key]];
        });
    }
    return sortParams;
};

// 预览Office, 支持doc,docx,pdf,ppt,pptx,xlsx，xls格式
export const previewOffice = (fileSrc:string) => window.open(`https://oos.baijia.com/op/view.aspx?src= ${fileSrc}`);

// 单位换算
export const byteConvert = bytes => {
    if (isNaN(bytes)) {
        return '';
    }
    const symbols = ['B', 'K', 'M', 'G', 'T', 'P', 'EB', 'ZB', 'YB'];
    let exp = Math.floor(Math.log(bytes) / Math.log(2));
    if (exp < 1) {
        exp = 0;
    }
    const i = Math.floor(exp / 10);
    bytes = bytes / Math.pow(2, 10 * i);
    if (i === 0) {
        bytes = bytes / Math.pow(2, 10);
        if (bytes.toString().length > bytes.toFixed(1).toString().length) {
            bytes = bytes.toFixed(1);
        }
        return bytes < 0.8 ? '0.8K' : `${bytes}K`;
    }
    if (bytes.toString().length > bytes.toFixed(1).toString().length) {
        bytes = bytes.toFixed(1);
    }
    return `${bytes} ${symbols[i]}`;
};
// 判断是否有选区
export const getSelected = () => {
    if (window.getSelection) {
        return window.getSelection().toString();
    }
    if (document.getSelection) {
        return document.getSelection().toString();
    }

    // @ts-ignore
    const selection = document.selection && document.selection.createRange();
    if (selection.text) {
        return selection.text.toString();
    }
    return '';

};

// 读取txt
export const viewText = fileSrc => new Promise((resolve, reject) => {
    let request = null;
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (request) {
        request.open('GET', fileSrc, true);
        request.overrideMimeType('text/html;charset=utf-8');
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 0) {
                    setTimeout(() => {
                        resolve(request.responseText || '此文档为空');
                    }, 300);
                }
                else {
                    reject('error');
                }
            }
        };
        request.send(null);
    }
    else {
        reject('error');
    }
});


// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
export const isSlave = window.__POWERED_BY_QIANKUN__;
