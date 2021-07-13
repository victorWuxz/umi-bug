import React, {useCallback, memo} from 'react';
import {Form, Space, Drawer, Button} from 'antd';
import omit from 'omit.js';
import type2Com from '@/components/FormComponents/map';
import {FormProps} from 'antd/es/form/index.d';
import {DrawerProps} from 'antd/es/drawer/index.d';
import {FItemProps} from '@/components/FormComponents/interface';
import {drawerProps, formProps} from './config';
import styles from './index.less';

export interface DrawerFormProps extends Omit<FormProps, 'title'>, DrawerProps {
    formItems: FItemProps[];
    gutter?: number;
    loading: boolean;
    onOk: (a: any) => {};
}

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 4},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
        md: {span: 18},
    },
};

const DrawerForm: React.FC<DrawerFormProps> = prop => {
    const {
        formItems,
        gutter = 10,
        onOk,
        loading,
        form,
        onClose,
    } = prop;

    const [curForm] = Form.useForm();

    const usedForm = form || curForm;

    const handleOk = useCallback(() => {
        usedForm.validateFields().then(values => {
            if (typeof onOk === 'function') {
                onOk(values);
            }
        });
    }, [onOk, usedForm]);

    const handleClose = useCallback(e => {
        usedForm.resetFields();
        if (typeof onClose === 'function') {
            onClose(e);
        }
    }, [onClose, usedForm]);

    return (
        <Drawer
            destroyOnClose
            width={500}
            onClose={handleClose}
            className={styles.modalForm}
            footer={(
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Space size={8}>
                        <Button onClick={handleClose} loading={loading}>
                            取消
                        </Button>
                        <Button onClick={handleOk} loading={loading} type="primary">
                            确定
                        </Button>
                    </Space>
                </div>
            )}
            {...omit(prop, [
                'formItems',
                'gutter',
                'onOk',
                'onClose',
                'loading',
                // @ts-ignore
                ...formProps
            ])}
        >
            <Form
                form={usedForm}
                layout="horizontal"
                {...formItemLayout}
                {...omit(prop, [
                    'form',
                    'formItems',
                    'gutter',
                    'title',
                    'onFinish',
                    'layout',
                    'loading',
                    // @ts-ignore
                    ...drawerProps
                ])}
            >
                <Space size={gutter} direction="vertical" style={{width: '100%'}}>
                    {formItems.map(item => (
                        <FormItem
                            label={item.label}
                            key={item.key}
                            name={item.key}
                            {...omit(item, [
                                'key',
                                'label',
                                'name',
                                'props',
                                'type'
                            ])}
                        >
                            {/* @ts-ignore */}
                            {type2Com[item.type] && type2Com[item.type](item.props)}
                        </FormItem>
                    ))}
                </Space>
            </Form>
        </Drawer>

    );
};

export default memo(DrawerForm);
