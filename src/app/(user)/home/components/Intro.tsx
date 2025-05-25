'use client';
import Image from 'next/image';
import React from 'react';

export default function Intro() {
    const introItems = [
        "Hỗ trợ đầy đủ các nghiệp vụ quản lý trong trường mầm non. Các loại hồ sơ, sổ sách bán trú được cập nhật ngay khi có sự chỉ đạo từ cấp quản lý nơi Bạn đang công tác.",
        "Không cần cài đặt phần mềm, dữ liệu tập trung và được sao lưu hằng ngày. Hạn chế tối đa việc mất dữ liệu.",
        "Công việc được phân công theo từng vai trò, tránh thực hiện công việc trùng lặp giữa các bộ phận. Giúp tiết kiệm tối đa thời gian và công sức.",
        "Hiệu trưởng, chủ cơ sở có thể quản lý và điều hành công việc mọi lúc, mọi nơi.",
        "Nắm bắt các thông tin kịp thời về thông báo, mời họp, lịch học, lớp bồi dưỡng… từ cấp quản lý qua hệ thống tin nhắn."
    ];

    return (
        <div
            className="w-full min-h-screen bg-cover bg-center flex items-center px-6 py-12 relative"
            style={{ backgroundImage: 'url("/assets/images/bg_intro.png")' }}
        >
            {/* Overlay tối nhưng không cản tương tác */}
            <div className="absolute inset-0 bg-opacity-40 pointer-events-none z-0" />

            {/* Nội dung chính */}
            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Hình ảnh */}
                <div className="flex justify-center">
                    <Image
                        src="/assets/images/img_intro.png"
                        alt="Intro"
                        width={600}
                        height={400}
                        className="object-contain"
                    />
                </div>

                {/* Nội dung mô tả */}
                <div className="text-white space-y-6 text-left">
                    {introItems.map((item, index) => (
                        <p key={index} className="flex items-start">
                            <span className="mr-2 text-lg">▶</span>
                            {item}
                        </p>
                    ))}

                    <button className="mt-4 bg-white text-blue-700 font-bold py-3 px-8 rounded hover:bg-gray-100 transition">
                        ĐĂNG KÝ NGAY
                    </button>
                </div>
            </div>
        </div>
    );
}
