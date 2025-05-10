"use client";

import LeftMenu from '@/src/components/sidebar/leftMenu';
import { useParams } from 'next/navigation';
import React from 'react';

const ClassDetail = () => {
    const params = useParams();
    const classId = params.id;
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