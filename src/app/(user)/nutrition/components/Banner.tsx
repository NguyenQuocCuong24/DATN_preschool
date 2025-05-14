import Image from 'next/image';
import React from 'react';

export default function Banner() {
    return (
        <div className="relative w-full h-[200px]">
            {/* Background image */}
            <Image
                src="/assets/images/bg_intro.png"
                alt="Background"
                fill
                className="object-cover z-0"
            />

            {/* Overlay content */}
            <div className="absolute inset-0 z-10 text-white">
                <div className="container pt-7 mt-7 mx-auto px-4 h-full flex flex-col justify-center items-center md:items-start md:flex-row md:justify-between">
                    {/* Title center on mobile, left on desktop */}
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold">Khẩu phần dinh dưỡng</h1>
                        <p className="text-xl mt-2">GrowthChart 2.0</p>
                    </div>

                    {/* Icon + subtitle: below title on mobile, right on desktop */}
                    <div className="mt-6 md:mt-0 flex flex-col items-center">
                        <Image
                            src="/assets/icons/ico_foodkids_white.png"
                            alt="Child Icon"
                            width={100}
                            height={60}
                        />
                        <div className="mt-2 bg-orange-300 text-orange-800 text-sm px-3 py-3 rounded-full shadow-md font-semibold whitespace-nowrap">
                            Theo dõi tình hình sức khỏe của trẻ
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
