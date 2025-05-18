"use client"

import LeftMenu from '@/src/components/sidebar/leftMenu';
import http from "@/src/request/httpConfig";
import { convertToDate, convertToTime } from '@/src/utils/datetime';
import { Select } from 'antd';
import { useEffect, useState } from "react";
import { ClassType, Lesson } from "../../request/model";
import { ClassResponse, LessonResponse } from "../../request/reponseType";
import FilterBox from '../student/filterBox';
import AttendanceTable from './AttendanceTable';


const Attendance = () => {
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [classId, setClassId] = useState<number>();

    const [lesson, setLesson] = useState<Lesson[]>([]);
    const [lessonId, setLessonId] = useState<number>();


    useEffect(() => {
        getAllClasses();
    }, [])

    useEffect(() => {
        getLessonByClassId();
    }, [classId])

    const getAllClasses = async () => {
        var response = await http.get<ClassResponse>("/classes");
        if(response.status === 200){
            setClasses(response.payload.data);
            setClassId(response.payload.data[response.payload.data.length - 1].id);
        }
    }

    const getLessonByClassId = async () => {
        var response = await http.get<LessonResponse>(`/lessons?classId=${classId}&sort=startTime:desc`);
        if(response.status === 200){
            const data = response.payload.data;
            if(data.length > 0){
                setLesson(response.payload.data);
                setLessonId(response.payload.data[0].id);
            }
        }
    }
    return (
        <div className="flex h-screen overflow-hidden">
        <LeftMenu />
        <div className="flex-1 px-24 py-4 overflow-y-auto">
            <div className="text-large-bold">Điểm danh</div>
            <div className='w-full bg-white rounded p-4'>
                <p className='text-normal-bold'>Điểm danh lớp học</p>
                <div className="flex pt-4">
                    <div className='w-1/3'>
                        <p>Lớp</p>
                        {classes && classId && <FilterBox classes={classes} classId={classId} setClassId={setClassId}/>}
                    </div>

                    <div>
                        <p>Ca học</p>
                        {lesson && lessonId && <Select
                                className='w-56'
                                showSearch
                                placeholder="Chọn ca học"
                                optionFilterProp="label"
                                onChange={setLessonId}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                value={lessonId}
                                options={lesson.map(item => ({
                                    value: item.id,
                                    label: convertToTime(item.startTime) + " - " + convertToTime(item.endTime) + " - " + convertToDate(item.startTime)
                                }))}
                            />}
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                {classId && lessonId && <AttendanceTable classId={classId} lessonId={lessonId}/>}
            </div>
        </div>

        
    </div>
    );
};

export default Attendance;