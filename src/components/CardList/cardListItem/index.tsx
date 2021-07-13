/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-lines-per-function */
/* eslint-disable react/forbid-component-props */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {useCallback} from 'react';
import {Card, Checkbox} from 'antd';
import {useCreation, usePersistFn} from 'ahooks';
import {FILETYPE_IMAGE} from '@/pages/material/config';
import {byteConvert, getSelected} from '@/utils/utils';
import {useAccess} from 'umi';
import {CardListItemProp} from '../interface';
import styles from './index.less';


const CardListItem:React.FC<CardListItemProp> = prop => {
    const {
        number, name, previewOnly,
        pictureUrl, selectedKeys, fileType,
        sendCount, downloadCount, fileSize, isStar,
        onPreview, onSelect, onOperate
    } = prop || {};
    const access = useAccess();

    // 勾选列表
    const handleChange = usePersistFn(e => {
        onSelect(number, e.target.checked, previewOnly);
    });
    // 文件预览
    const handlePreview = useCallback(() => {
        // 如果有选区，则不触发预览
        const sel = getSelected();
        if (sel) {
            return;
        }
        onPreview(fileType, number);
    }, [fileType, number, onPreview]);

    // 按钮们
    const buttonOptions = useCreation(() => ({
        detail: '详情',
        edit: '编辑',
        star: isStar ? '取消收藏' : '收藏',
        delete: '删除',
        download: '下载',
    }), []);

    // 点击操作按钮
    const handleClick = usePersistFn(type => {
        if (type === 'star') {
            type = isStar ? 'cancelStar' : type;
        }
        onOperate(type, number, prop);
    });

    // 生成操作按钮
    const createBtn = useCallback(typeArr => (
        typeArr?.map(type => (
            <div
                key={type} onClick={() => handleClick(type)}
                style={{minWidth: (isStar && type === 'star') ? '48px' : '32px'}}
            >
                {buttonOptions[type]}
            </div>
        ))
    ), [handleClick, buttonOptions, isStar]);

    // 根据权限生成操作按钮
    const ActionButtons = useCreation(() => {
        const buttons = ['detail'];
        previewOnly || buttons.push('download');
        access.createAndEdit && buttons.push('edit');
        buttons.push('star');
        access.createAndEdit && buttons.push('delete');
        return createBtn(buttons);
    }, [previewOnly]);

    return (
        <Card
            className={styles.cardItem}
            // 下方操作按钮
            // eslint-disable-next-line @babel/new-cap
            actions={ActionButtons}
            key={number + Number(previewOnly)}
        >
            <div className={styles.info}>
                <img
                    className={styles.image}
                    src={FILETYPE_IMAGE[fileType?.toUpperCase()]
                        || `${pictureUrl}?x-oss-process=image/resize,limit_0,m_fill,w_136,h_136/format,webp`}
                    alt="文件类型"
                    onClick={handlePreview}
                />
                <div className={styles.content} >
                    <h4 className={styles.title} role="button" onClick={handlePreview}>
                        {
                            previewOnly && <span className={styles.readOnly}>仅预览</span>
                        }
                        <span>
                            {/* eslint-disable-next-line react/no-danger */}
                            <span dangerouslySetInnerHTML={{__html: name}} ></span>
                        </span>
                    </h4>
                    <span className={styles.number}>
                        编号：
                        {number}
                    </span>
                </div>
                <div>
                    <Checkbox
                        checked={selectedKeys.includes(number)}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.statistics}>
                <span >
                    <span className="iconfont icon-fasong"></span>
                    {sendCount}
                </span>
                <span >
                    <span className="iconfont icon-xiazai"></span>
                    {downloadCount}
                </span>
                <span >
                    <span className="iconfont icon-cunchu"></span>
                    {byteConvert(fileSize)}
                </span>
            </div>
        </Card>
    );
};

export default CardListItem;
