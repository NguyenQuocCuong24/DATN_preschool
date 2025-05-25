"use client"
import { DatePicker } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

type WeekPickerProps = {
  setSelectDate: (date: Date) => void;
};

const WeekPicker = ({ setSelectDate }: WeekPickerProps) => {
    const onWeekChange = (date: Dayjs, dateString: string | string[]) => {
        setSelectDate(date?.toDate())
        console.log('Chọn tuần:', date);
    };

    const weekFormat = (date: Dayjs) => {
        const start = date.startOf('isoWeek');
        const end = date.endOf('isoWeek');
        return `${start.format('DD/MM')} - ${end.format('DD/MM')}`;
    };
    return (
        <div>
            <DatePicker picker="week" onChange={onWeekChange} format={weekFormat} defaultValue={dayjs()}/>
        </div>
    );
};

export default WeekPicker;