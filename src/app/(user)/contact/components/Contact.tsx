'use client';

import React from 'react';

export default function Contact() {
    const contactInfo = [
        { label: 'Địa chỉ', value: '46/4K đường Nhà Vườn, Ấp Mỹ Hòa 1, Xã Trung Chánh, Huyện Hóc Môn, TP.HCM' },
        { label: 'Điện thoại đăng ký sử dụng', value: '(028) 7308.5588' },
        { label: 'Tổng đài chăm sóc khách hàng', value: '0899.520.868' },
        {
            label: 'Email',
            value: (
                <a href="mailto:kinhdoanh@baocongnghe.vn" className="text-blue-600 hover:underline">
                    kinhdoanh@baocongnghe.vn
                </a>
            ),
        },
        {
            label: 'Website',
            value: (
                <a
                    href="http://www.sc.edu.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                >
                    http://www.sc.edu.vn
                </a>
            ),
        },
    ];

    return (
        <div className="mb-20">
            {/* Thông tin liên hệ */}
            <div className="max-w-5xl mx-auto mt-6 bg-[#f3f3f3] rounded shadow px-6 py-8">
                <div className="bg-[#007AC3] text-white text-center px-4 py-4 text-xl">
                    <p>
                        Cảm ơn sự quan tâm của bạn dành cho Báo Công Nghệ.<br />
                        Xin vui lòng gọi điện đến số tổng đài{' '}
                        <span className="font-bold">(028) 7308.5588 - 0899.520.868</span> hoặc gửi email cho chúng tôi theo địa chỉ{' '}
                        <a href="mailto:kinhdoanh@baocongnghe.vn" className="text-yellow-300 font-semibold">
                            kinhdoanh@baocongnghe.vn
                        </a>
                        ,<br />
                        chúng tôi sẽ phản hồi lại thông tin cho bạn trong thời gian sớm nhất.
                    </p>
                </div>
                <div className="bg-[#eaeaea] p-6">
                    <h2 className="font-semibold mb-4 text-xl">CÔNG TY CPĐT PHẦN MỀM BÁO CÔNG NGHỆ</h2>
                    {contactInfo.map((item, index) => (
                        <p key={index} className="mb-2 text-xl">
                            <strong>{item.label}:</strong> {item.value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
