import React from 'react';
import ProForm, {ProFormText} from '@ant-design/pro-form';

export default () => {
    const [form] = ProForm.useForm();
    return (
        <ProForm form={form} initialValues={{a: '1'}}>
            <ProFormText name="a" />
        </ProForm>
    );
};
