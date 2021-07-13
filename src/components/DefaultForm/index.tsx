import React, {memo} from 'react';
import {Form} from 'antd';
import omit from 'omit.js';
import {FormProps} from 'antd/es/form/index.d';
import {FItemProps} from './interface.d';

export interface DefaultForm extends FormProps {
    formItems: FItemProps[];
    loading: boolean;
    layout: any;
}

const FormItem = Form.Item;

const DefaultForm: React.FC<DefaultForm> = prop => {
    const {
        formItems,
        layout,
    } = prop;
    return (
        <Form
            {...layout}
            // 删除多余参数
            {...omit(prop, [
                'formItems',
                'layout',
            ])}
        >
            {/* 遍历表单项 */}
            {formItems.map(item => (
                <FormItem
                    key={item.key || item.name}
                    {...omit(item, ['render'])}
                >
                    {/* 渲染表单配置中所传组件 */}
                    {item?.render(prop)}
                </FormItem>
            ))}
        </Form>
    );
};

// 使用memo包裹，减少渲染次数
export default memo(DefaultForm);
