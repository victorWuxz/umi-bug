import {Dayjs} from 'dayjs';
import {FormItemProps} from 'antd/es/form/index.d';
import {InputProps} from 'antd/es/input/Input.d';
import {TextAreaProps} from 'antd/es/input/TextArea.d';
import {TimePickerProps} from './TimePicker';
import {DatePickerProps, RangePickerProps} from './DatePicker';
import {SingleSelectProps} from './Select';


export interface FItemProps extends FormItemProps {
    key: string;
    type: 'select' | 'input' | 'datePicker' | 'rangePicker' | 'textArea';
    props: InputProps | TextAreaProps | SingleSelectProps | DatePickerProps | RangePickerProps | TimePickerProps;
}

export {DatePickerProps, RangePickerProps, TimePickerProps, InputProps, TextAreaProps, SingleSelectProps};

