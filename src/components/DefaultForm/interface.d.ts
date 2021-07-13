import {FormItemProps} from 'antd/es/form/index.d';

export interface FItemProps extends FormItemProps {
    key: string;
    render: (props: any) => any;
}

