'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const companyInfo = {
    name: 'CÔNG TY CỔ PHẦN ĐẦU TƯ PHẦN MỀM BẢO CÔNG NGHỆ',
    address: '46/4K đường Nhà Vuông, Ấp Mỹ Hòa 1, Xã Trung Chánh, Hóc Môn',
    support: {
        cs: '(028) 7308.5588 - 0899.520.868',
        sales: '0842.555.317 (Mr.Tuấn)',
        tech: [
            '0901.337.490 (Mr.Hiếu)',
        ],
        complaint: [
            '0968.183.143 (Mr.Vinh)',
        ],
        email: 'kinhdoanh@baocongnghe.vn',
    }
};

const policyLinks = [
    { label: 'Chính sách thanh toán', href: '/chinh-sach/thanh-toan' },
    { label: 'Chính sách khiếu nại', href: '/chinh-sach/khieu-nai' },
    { label: 'Chính sách đổi trả, bảo hành', href: '/chinh-sach/doi-tra' },
    { label: 'Chính sách vận chuyển', href: '/chinh-sach/van-chuyen' },
    { label: 'Chính sách bảo mật', href: '/chinh-sach/bao-mat' },
];

export default function Footer() {
    return (
        <footer className="bg-[#263b3f] text-white text-sm py-8">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cột 1 - Thông tin công ty */}
                    <div className="space-y-5">
                        <p className="font-bold">{companyInfo.name}</p>
                        <p>Địa chỉ: {companyInfo.address}</p>
                        <p>Tổng đài CSKH: {companyInfo.support.cs}</p>
                        <p>Kinh doanh: {companyInfo.support.sales}</p>
                        <p>Hỗ trợ kỹ thuật:</p>
                        {companyInfo.support.tech.map((item, idx) => (
                            <p key={idx}>{item}</p>
                        ))}
                        <p>Khiếu nại, góp ý:</p>
                        {companyInfo.support.complaint.map((item, idx) => (
                            <p key={idx}>{item}</p>
                        ))}
                        <p>Email: <a href={`mailto:${companyInfo.support.email}`} className="text-cyan-400">{companyInfo.support.email}</a></p>
                    </div>

                    {/* Cột 2 - Chính sách */}
                    <div>
                        <p className="font-bold mb-2">CHÍNH SÁCH & QUY ĐỊNH</p>
                        <ul className="space-y-5">
                            {policyLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="text-cyan-400 hover:underline">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 3 - Facebook (giả lập) */}
                    <div className="flex justify-center items-start">
                        <div className="bg-white p-3 rounded shadow w-full max-w-[220px] text-center">
                            <Image
                                src="/assets/images/logo-school.png"
                                alt="Facebook"
                                width={300}
                                height={200}
                                className="w-full h-24 object-contain mx-auto"
                            />
                            <span className="text-black text-sm block mt-1">Bảo Công Nghệ</span>
                            <div className="mt-2">
                                <button className="bg-[#1877f2] text-white text-xs px-3 py-1 rounded">Theo dõi Trang</button>
                                <p className="text-black text-xs mt-1">462 người theo dõi</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gạch dưới như thẻ <hr> */}
                <div className="border-t border-gray-500 my-6"></div>

                {/* Bản quyền */}
                <div className="text-center text-gray-300 text-xs">
                    <p>Bản quyền © 2015 thuộc về công ty CPĐT phần mềm <span className="text-cyan-400">Bảo Công Nghệ</span></p>
                    <p>Đang trực tuyến: 203 - Lượt truy cập: 3574128</p>
                </div>
            </div>
        </footer>
    );
}
