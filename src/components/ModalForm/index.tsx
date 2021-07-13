import React, {useCallback, memo} from 'react';
import {Form, Space, Modal} from 'antd';
import omit from 'omit.js';
import type2Com from '@/components/FormComponents/map';
import {FormProps} from 'antd/es/form/index.d';
import {ModalProps} from 'antd/es/modal/Modal.d';
import {FItemProps} from '@/components/FormComponents/interface';
import {modalProps, formProps} from './config';
import styles from './index.less';

export interface ModalFormProps extends Omit<FormProps, 'title'>, Omit<ModalProps, 'onOk'> {
    formItems: FItemProps[];
    gutter?: number;
    loading: boolean;
    onOk: (a: any) => void;
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

const ModalForm: React.FC<ModalFormProps> = prop => {
    const {
        formItems,
        gutter = 10,
        onOk,
        onCancel,
        loading,
        form,
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

    const handleCancel = useCallback(e => {
        usedForm.resetFields();
        if (typeof onCancel === 'function') {
            onCancel(e);
        }
    }, [onCancel, usedForm]);

    return (
        <Modal
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{loading}}
            centered
            destroyOnClose
            className={styles.modalForm}
            {...omit(prop, [
                'formItems',
                'gutter',
                'onOk',
                'onCancel',
                'okButtonProps',
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
                    ...modalProps
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
        </Modal>

    );
};

export default memo(ModalForm);
