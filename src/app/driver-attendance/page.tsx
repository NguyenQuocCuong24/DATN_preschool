"use client"

import Loading from '@/src/components/loading';
import LeftMenu from '@/src/components/sidebar/leftMenu';
import http from "@/src/request/httpConfig";
import { DatePicker, Input, Select } from 'antd';
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Schedule } from "../../request/model";
import { ScheduleResponse } from "../../request/reponseType";
import AttendanceTable from './AttendanceTable';
import { Search } from 'lucide-react';


const Attendance = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [scheduleId, setScheduleId] = useState<number>();

    const [loading, setLoading] = useState<boolean>(true)
    const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        getAllSchedules();
    }, [])

    const getAllSchedules = async () => {
        const response = await http.get<ScheduleResponse>("/schedules");
        if(response.status === 200){
            setSchedules(response.payload.data);
            setScheduleId(response.payload.data[response.payload.data.length - 1].id);
            setLoading(false);
        }
    }

    const onDateChange = (value: Dayjs) => {
        setCurrentDate(value);
    }
    return (
        <div className="flex h-screen overflow-hidden">
        <LeftMenu />
        {loading ? <Loading /> : <div className="flex-1 px-24 py-4 overflow-y-auto">
            <div className="text-large-bold">Điểm danh</div>
            <div className='w-full bg-white rounded p-4'>
                <p className='text-normal-bold'>Điểm danh đi xe</p>
                <div className="flex pt-4">
                    <div className='w-1/3'>
                        <p>Lịch trình</p>
                        {schedules && scheduleId && 
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
                                options={schedules.map(item => ({
                                value: item.id,
                                label: item.name
                                }))}
                            />
                        }
                    </div>

                    <div>
                        <p>Ngày điểm danh</p>
                        <DatePicker className='w-full' format={"DD-MM-YYYY"} defaultValue={dayjs()} onChange={onDateChange}/>
                    </div>


                    <div className="ml-24 items-center gap-4 mb-4">
                        <p>Tìm kiếm</p>
                        <div className="flex gap-2">
                            <Input
                                prefix={<Search size={16} />}
                                placeholder="Tìm học sinh..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                {scheduleId && <AttendanceTable scheduleId={scheduleId} currentDate={currentDate} search={search} />}
            </div>
        </div>}

        
    </div>
    );
};

export default Attendance;