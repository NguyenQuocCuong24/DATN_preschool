import Image from 'next/image';
import React from 'react';

export default function Banner() {
    return (
        <div className='mb-20'>
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
                            <h1 className="text-3xl md:text-4xl font-bold">Đăng ký</h1>
                        </div>

                        {/* Icon + subtitle: below title on mobile, right on desktop */}
                        <div className="mt-6 md:mt-0 flex flex-col items-center">
                            <Image
                                src="/assets/icons/ico_register.png"
                                alt="Child Icon"
                                width={100}
                                height={60}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
