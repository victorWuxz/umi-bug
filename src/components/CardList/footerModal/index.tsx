/* eslint-disable react/forbid-component-props */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, {useEffect} from 'react';
import {Button} from 'antd';
import {useAccess} from 'umi';
import {useCreation} from 'ahooks';
import {FooterModalProp} from '../interface';
import styles from './index.less';


const FooterModal:React.FC<FooterModalProp> = prop => {
    const {selectedNum, readOnlyNum, visible, onCancel, onBatchOperate, selectedItems} = prop || {};
    const access = useAccess();

    const isAllStar = useCreation(() => selectedItems?.filter(item => !item.isStar).length === 0, [selectedItems]);
    useEffect(() => {
        console.log('selectedItems', selectedItems);

    }, [selectedItems]);
    return (
        <div
            className={visible ? styles.visible : styles.footerCard}
            style={{height: visible ? '60px' : 0}}
        >
            <span className={styles.padding10}>
                已选择
                <span className={styles.number}>
                    {selectedNum}
                    份
                </span>
                资料
                {
                    readOnlyNum > 0 && (
                        <>
                            ,
                            <span className={styles.number}>
                                {readOnlyNum}
                                份
                            </span>
                            资料不支持发送/下载
                        </>
                    )
                }
            </span>
            <Button
                className={styles.cencelBtn}
                onClick={onCancel}
            >
                取消选择
            </Button>
            <div className={styles.btns}>
                {
                    readOnlyNum === 0 && (
                        <Button
                            onClick={() => onBatchOperate('download')}
                        >
                            批量下载
                        </Button>
                    )
                }
                <Button onClick={() => onBatchOperate(isAllStar ? 'cancelStar' : 'star')} >
                    {isAllStar ? '批量取消收藏' : '批量收藏'}
                </Button>
                {
                    access.createAndEdit && <Button onClick={() => onBatchOperate('delete')}>批量删除</Button>
                }

            </div>
        </div>
    );
};
export default FooterModal;
