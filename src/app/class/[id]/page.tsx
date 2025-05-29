"use client";

import LeftMenu from '@/src/components/sidebar/leftMenu';

const ClassDetail = () => {
    return (
        <div className="flex">
            <LeftMenu />
            <div className='flex-1 px-24 py-4'>
                <div className="text-large-bold">Thời khoá biểu11</div>
            </div>
        </div>
    );
};

export default ClassDetail;