import {Dayjs} from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';
import 'antd/es/date-picker/style/index';
import {
    PickerProps,
    RangePickerProps as OldRangePickerProps,
} from 'antd/es/date-picker/generatePicker/index.d';

export type DatePickerProps = PickerProps<Dayjs>;
export type RangePickerProps = OldRangePickerProps<Dayjs>;

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
