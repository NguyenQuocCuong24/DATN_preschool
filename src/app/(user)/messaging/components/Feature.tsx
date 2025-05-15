import Image from 'next/image';
import React from 'react';

export default function Feature() {
    const features = [
        "Nhanh chóng gửi thông tin thông báo từ trường đến tất cả các phụ huynh học sinh.",
        "Gửi tin nhắn nhắc nhở phụ huynh đóng tiền nợ học phí.",
        "Gửi tin nhắn thông báo cho tất cả giáo viên toàn trường.",
    ];

    return (
        <div className='mb-20'>
            <div className="bg-white py-4 px-6 max-w-6xl mx-auto pt-10">
                {/* Tiêu đề */}
                <div className="flex items-center bg-blue-100 px-4 py-2 rounded-t-md w-fit mb-4">
                    <Image
                        src="/assets/images/ico_tab01.png" // Giả sử bạn có icon giống ảnh mẫu
                        alt="icon"
                        width={50}
                        height={50}
                        className="mr-2"
                    />
                    <span className="text-blue-600 font-semibold text-lg">
                        Các tính năng nổi bật
                    </span>
                </div>

                {/* Nội dung */}
                <div className="flex bg-white border rounded-md shadow-md">
                    <div className="w-1/3 p-6 flex justify-center items-center">
                        <Image
                            src="/assets/icons/sms.png"
                            alt="Biểu đồ tăng trưởng"
                            width={250}
                            height={250}
                            className="object-contain"
                        />
                    </div>
                    <div className="w-2/3 p-6">
                        <ul className="list-decimal list-inside text-gray-800 space-y-4 text-[20px] leading-relaxed">
                            {features.map((feature, idx) => (
                                <li key={idx} className="font-medium pb-2 relative">
                                    {feature}
                                    <div className="absolute bottom-0 left-0 w-full border-t border-gray-300 mt-2"></div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
