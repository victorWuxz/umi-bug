import React, {useCallback, memo} from 'react';
import {Button, Form, Space} from 'antd';
import omit from 'omit.js';
import type2Com from '@/components/FormComponents/map';
import {FormProps} from 'antd/es/form/index.d';
import {FItemProps} from '@/components/FormComponents/interface';
import styles from './index.less';

export interface StandardFormProps extends FormProps {
    formItems: FItemProps[];
    gutter?: number;
    loading?: boolean;
    onReset?: () => void;
}

const FormItem = Form.Item;

const StandardForm: React.FC<StandardFormProps> = prop => {
    const {
        formItems,
        gutter = 10,
        onReset,
        loading,
        form
    } = prop;

    const [curForm] = Form.useForm();

    const usedForm = form || curForm;

    const handleReset = useCallback(() => {
        usedForm.resetFields();
        if (typeof onReset === 'function') {
            onReset();
        }
    }, [onReset, usedForm]);

    return (

        <Form
            form={usedForm}
            layout="inline"
            {...omit(prop, [
                'form',
                'formItems',
                'gutter',
                'onReset',
                'layout',
                'loading'
            ])}
        >
            <Space size={gutter} align="center">
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
                <FormItem>
                    {/* 此处必须添加loading，loading提交接口的loading */}
                    <Button loading={loading} type="primary" htmlType="submit">确定</Button>
                    <Button loading={loading} onClick={handleReset} className={styles.ml10}>重置</Button>
                </FormItem>
            </Space>
        </Form>
    );
};

export default memo(StandardForm);
