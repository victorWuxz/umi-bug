/* eslint-disable import/named */
import React from 'react';
// import {Input, DatePicker, TimePicker} from 'antd';
import {Input} from 'antd';
// import {DatePickerProps, RangePickerProps} from 'antd/es/date-picker';
// import {TimePickerProps} from 'antd/es/time-picker';
import Select, {SingleSelectProps} from './Select';
import {InputProps, TextAreaProps, DatePickerProps, RangePickerProps, TimePickerProps} from './interface.d';
// import {InputProps, TextAreaProps} from './interface.d';

import {DatePicker, TimePicker} from './index';

const {RangePicker} = DatePicker;
const {TextArea} = Input;

const type2Com = {
    select: (props: SingleSelectProps) => <Select {...(props || {})} />,
    input: (props: InputProps) => <Input {...(props || {})} />,
    datePicker: (props: DatePickerProps) => <DatePicker {...(props || {})} />,
    rangePicker: (props: RangePickerProps) => <RangePicker {...(props || {})} />,
    timePicker: (props: TimePickerProps) => <TimePicker {...(props || {})} />,
    textArea: (props: TextAreaProps) => <TextArea {...(props || {})} />,
};

export default type2Com;
