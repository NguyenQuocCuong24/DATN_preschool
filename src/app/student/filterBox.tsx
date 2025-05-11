import { ClassType } from '@/src/request/model';
import { Select } from 'antd';
import React from 'react';

type FilterBoxProps = {
    classes: ClassType[];
    classId: number
    setClassId: (classId: number) => void;
}

const FilterBox = (props : FilterBoxProps) => {
    const {classes, classId, setClassId} = props;
    return (
        <div>
            <Select
                className='w-48'
                showSearch
                placeholder="Chọn lớp học"
                optionFilterProp="label"
                onChange={setClassId}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                value={classId}
                options={classes.map(item => ({
                value: item.id,
                label: item.name
                }))}
            />
        </div>
    );
};

export default FilterBox;