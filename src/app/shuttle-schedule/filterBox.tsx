import { Schedules } from '@/src/request/model';
import { Select } from 'antd';
import React from 'react';

type FilterBoxProps = {
    schedules: Schedules[];
    scheduleId: number
    setScheduleId: (scheduleId: number) => void;
}

const FilterBox = (props : FilterBoxProps) => {
    const {schedules: classes, scheduleId, setScheduleId} = props;
    return (
        <div>
            <Select
                className='w-48'
                showSearch
                placeholder="Chọn lịch trình"
                optionFilterProp="label"
                onChange={setScheduleId}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                value={scheduleId}
                options={classes.map(item => ({
                value: item.id,
                label: item.name
                }))}
            />
        </div>
    );
};

export default FilterBox;