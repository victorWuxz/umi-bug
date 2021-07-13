/* eslint-disable react/forbid-component-props */
/* eslint-disable max-lines-per-function */
import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Row, Col, Pagination, Spin, Checkbox, Empty} from 'antd';
import {useCreation, usePersistFn} from 'ahooks';
import omit from 'omit.js';
import {CardListProp} from './interface';
import styles from './index.less';
import CardListItem from './cardListItem';
import FooterModal from './footerModal';


const CardList:React.FC<CardListProp> = prop => {
    // eslint-disable-next-line max-len
    const {
        dataSource, toolBarRender, pagination, loading, isClearAll, onBatchOperate,
        onPageChange, onSelectionChange, onOperate, onPreview, onShowSizeChange, failedNumbers
    } = prop || {};
    const toolBtn = typeof (toolBarRender) === 'function' && toolBarRender();
    const [isAll, setIsAll] = useState(false);
    const [visible, setVisible] = useState(false);
    // 选择项的dataSource存起来
    const [selectedItems, setSelectedItems] = useState([]);
    // 选择的keys
    const selectedKeys = useCreation(() => selectedItems.map(item => item.number), [selectedItems]);
    // 选择项的只读data
    const readOnlyKeys = useCreation(() => selectedItems.filter(item => item.previewOnly), [selectedItems]);
    // 选择列表
    const onSelect = useCallback((number, status) => {
        if (status) {
            setSelectedItems([...selectedItems, ...dataSource.filter(item => item.number === number)]);
        }
        else {
            setSelectedItems([...selectedItems.filter(item => item.number !== number)]);
        }
    }, [selectedItems, dataSource]);

    useEffect(() => {
        console.log(failedNumbers);
        setSelectedItems(selectedItems.filter(item => failedNumbers.includes(item.number)));
    }, [failedNumbers]);
    // 取消选择
    const handleCancel = usePersistFn(() => {
        setVisible(false);
        setTimeout(() => {
            setSelectedItems([]);
        // eslint-disable-next-line no-magic-numbers
        }, 500);
    });

    // 选择当前页
    const handleSelectAll = useCallback(e => {
        const isAll = e.target.checked;
        const currentKeys = dataSource.map(item => item.number);
        if (isAll) {
            let data = [...selectedItems, ...dataSource];
            const keys = [];
            data = data.filter(item => {
                if (keys.includes(item.number)) {
                    return false;
                }
                keys.push(item.number);
                return true;
            });
            setSelectedItems(data);
        }
        else {
            setSelectedItems(selectedItems.filter(item =>
                !currentKeys.includes(item.number)));
        }

    }, [dataSource, selectedItems]);

    useEffect(() => {
        onSelectionChange(selectedKeys);
        // eslint-disable-next-line max-len
        setIsAll(dataSource.length !== 0 && (dataSource.filter(item => !selectedKeys.includes(item.number))).length === 0);
    }, [selectedKeys, dataSource, onSelectionChange]);

    useEffect(() => {
        if (isClearAll) {
            setSelectedItems([]);
        }
    }, [isClearAll]);

    // 根据选择项设置footerModel显隐
    useEffect(() => {
        if (selectedItems?.length > 0) {
            setVisible(true);
        }
        else {
            setVisible(false);
        }
    }, [selectedItems]);

    return (
        <>
            <Spin style={{minHeight: '500px'}} spinning={loading}>
                <header className={styles.header}>
                    {Array.isArray(toolBtn)
                        ? toolBtn.map((item, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index} className={`${styles.mr10} ${styles.floatl}`}>
                                {item}
                            </div>
                        ))
                        : toolBtn}
                </header>
                <Row gutter={16} >
                    {dataSource?.map(item => (
                        // eslint-disable-next-line react/forbid-component-props
                        <Col
                            style={{marginBottom: '12px'}} key={item.number + item.isStar}
                            xs={24} sm={12} md={12} lg={8} xl={8}
                            xxl={6}
                        >
                            <CardListItem
                                key={`${item.number}_${Number(item.previewOnly)}`}
                                {...item}
                                selectedKeys={selectedKeys}
                                onOperate={onOperate}
                                onSelect={onSelect}
                                onPreview={onPreview}
                            />
                        </Col>
                    ))}
                </Row>
                {
                    pagination?.total > 0 && (
                        <div className={styles.footer} style={{marginBottom: selectedKeys.length > 0 ? '60px' : 0}}>
                            <Checkbox
                                checked={isAll} onChange={handleSelectAll}
                            >
                                选择当前页
                            </Checkbox>
                            <Pagination
                                {...omit(pagination, ['onChange'])}
                                onChange={onPageChange}
                                onShowSizeChange={onShowSizeChange}
                            />
                        </div>
                    )
                }
                {
                    pagination.total === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
            </Spin>
            <FooterModal
                key={Number(selectedKeys.length)}
                selectedNum={selectedKeys?.length}
                readOnlyNum={readOnlyKeys?.length}
                visible={visible}
                onBatchOperate={onBatchOperate}
                onCancel={handleCancel}
                selectedItems={selectedItems}
            />
        </>

    );
};
export default CardList;

