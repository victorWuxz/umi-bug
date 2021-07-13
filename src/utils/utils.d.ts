import {TableProps, TablePaginationConfig} from 'antd/es/table/index.d';

export {TableProps, TablePaginationConfig};

export interface FormatPaginationProps extends TablePaginationConfig {
    pageNum: number | null | undefined;
    count: number | null | undefined;
}

export interface OptionItem {
    key: number | string;
    label: string;
    value: number | string;
}
