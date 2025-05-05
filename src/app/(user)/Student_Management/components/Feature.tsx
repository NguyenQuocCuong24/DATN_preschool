import Image from 'next/image';
import React from 'react';

export default function Feature() {
    const features = [
        "Dễ dàng theo dõi thông tin học tập, thông tin cân đo hàng tháng, hàng quý của tất cả các bé. Hỗ trợ từng lớp nhập thông tin cân đo dễ dàng.",
        "Tự động đánh giá tình trạng sức khỏe → Dự báo tình trạng sức khỏe của bé để nhà trường có chế độ ăn hợp lý riêng cho bé.",
        "Hỗ trợ in các mẫu báo cáo theo từng tình trạng nhẹ cân, thấp còi, thừa cân béo phì… theo từng lớp hoặc từng trường.",
        "Hỗ trợ gửi thông tin cân đo bằng phân hệ tin nhắn đến số điện thoại phụ huynh học sinh.",
        "Hỗ trợ xuất danh sách excel theo nhiều tiêu chí lọc → Phục vụ trong công tác phổ cập mầm non.",
    ];

    return (
        <div className="container p-6 bg-white mx-auto mt-10">
            <div className="flex items-center mx-10 ml-5 bg-blue-100 p-4 rounded-md shadow">
                <Image
                    src="/assets/images/growthchart.png"
                    alt="Intro"
                    width={300}
                    height={300}
                    className="object-contain"
                />
                <ul className="w-2/3 list-decimal list-inside text-gray-800 space-y-3 px-6">
                    {features.map((feature, idx) => (
                        <li key={idx} className="text-base leading-relaxed">
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
