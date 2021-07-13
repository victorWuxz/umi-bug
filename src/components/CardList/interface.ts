import {PaginationConfig} from 'antd/es/pagination/Pagination.d';
import React from 'react';

interface DataSource{
    number:string;
    name: string;
    isShare:number;
    previewOnly:boolean;
    isStar:boolean;
    id:number;
    pictureUrl:string;
    sendCount:number;
    downloadCount:number;
    fileSize:number;
    fileType:string;
}

export interface CardListProp {
    isClearAll: boolean;
    failedNumbers: string[];
    dataSource:DataSource[];
    toolBarRender?:() => React.ReactNode[]|React.ReactNode;
    pagination:PaginationConfig;
    loading?:boolean;
    onOperate:(type:string, number:string, data: DataSource)=>void;
    onBatchOperate:(type:string)=>void;
    onPageChange:(page:number, pageSize:number)=>void;
    onSelectionChange:(selectedKeys:string[])=>void;
    onPreview:(fileFormat:string, number:string)=>void;
    onShowSizeChange:()=>void;
}

export interface CardListItemProp extends DataSource{
    onOperate:(type:string, number:string, data:DataSource)=>void;
    selectedKeys?:string[];
    onSelect:(number:string, e:boolean, previewOnly:boolean)=>void;
    onPreview:(fileFormat:string, number:string)=>void;
}
export interface FooterModalProp{
    selectedNum:number;
    readOnlyNum:number;
    visible:boolean;
    onBatchOperate:(type:string)=>void;
    onCancel:()=>void;
    selectedItems:DataSource[];
}
