"use client"
import LeftMenu from '@/src/components/sidebar/leftMenu';
import TimeTable from './timetable';

const Lesson = () => {
    return (
        <div className="flex">
        <LeftMenu />
        <div className='flex-1 px-24 py-4'>
            <div className="text-large-bold">Thời khoá biểu</div>
            <TimeTable />
        </div>
        
    </div>
    );
};

export default Lesson;