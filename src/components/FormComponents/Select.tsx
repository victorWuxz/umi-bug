import React, {memo} from 'react';
import {Select} from 'antd';
import omit from 'omit.js';
import {usePersistFn, useCreation} from 'ahooks';
import {SelectProps} from 'antd/es/select/index.d';
import {formatOptions} from '@/utils/utils';

export interface OptionItem {
    key: number | string;
    label: string;
}
export interface SingleSelectProps extends Omit<SelectProps<any>, 'options'>{
    options: OptionItem[];
}

const SingleSelect:React.FC<SingleSelectProps> = props => {
    const {options = []} = props;

    const newOptions = useCreation(() => formatOptions(options), [options]);

    const handleFilterOption = usePersistFn(
        (input, option) => option?.label?.toLowerCase()?.indexOf(input.toLowerCase()) >= 0
    );

    const handleMaxTagPlaceholder = usePersistFn(omittedValues => omittedValues.length + 1);

    return (
        <Select
            style={{width: '100%'}}
            options={newOptions}
            showArrow
            allowClear
            maxTagCount={1}
            maxTagPlaceholder={handleMaxTagPlaceholder}
            filterOption={handleFilterOption}
            {...omit(props, ['options'])}
        />
    );
};
export default memo(SingleSelect);
