import React from 'react';
import Image from 'next/image';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function Header() {
    return (
        <header className="">
            <div className="container mx-auto flex flex-col mb-4">
                {/* Logo + Nav */}
                <div className="container flex items-center justify-between mt-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Image
                            src="/assets/images/logo-school.png"
                            alt="Logo"
                            width={300}
                            height={80}
                        />
                    </div>

                    {/* Nav menu */}
                    <nav className=" hidden md:flex items-center gap-8 text-sm text-gray-700 font-medium">
                        <Link
                            href="/home"
                            className="border border-blue-500 px-3 py-1 rounded text-blue-600 font-semibold hover:bg-blue-50"
                        >
                            TRANG CHỦ
                        </Link>

                        {/* Dropdown */}
                        <div className="relative group">
                            <Button className="hover:text-white transition rounded-xl hover:border hover:bg-blue-400 px-4 py-2 font-semibold text-blue-600 border border-transparent">
                                TÍNH NĂNG
                            </Button>

                            <div className="container absolute left-1/2 w-2xl  top-full transform -translate-x-1/2 mt-2 bg-white shadow-lg border border-gray-200 rounded-xl z-50 px-6 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
                                <div className="flex justify-center gap-x-6 text-base text-gray-700 whitespace-nowrap left-60">
                                    <Link href="/Student_Management" className="hover:underline hover:text-blue-600 transition">Quản lý học sinh</Link>
                                    <Link href="#" className="hover:underline hover:text-blue-600 transition">Tính lương giáo viên</Link>
                                    <Link href="#" className="hover:underline hover:text-blue-600 transition">Quản lý thu chi</Link>
                                    <Link href="#" className="hover:underline hover:text-blue-600 transition">Tin nhắn</Link>
                                </div>
                            </div>
                        </div>

                        <Link href="#" className="hover:text-blue-600 transition">SỔ SÁCH BÁN TRÚ</Link>
                        <Link href="#" className="hover:text-blue-600 transition">ĐĂNG KÝ</Link>
                        <Link href="#" className="hover:text-blue-600 transition">LIÊN HỆ</Link>
                    </nav>
                    <div className="flex justify-end items-center space-x-2">
                        <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-100 transition text-sm font-semibold">
                            HỖ TRỢ TỪ XA
                        </button>
                        <button className="border border-blue-500 text-blue-500 px-4 py-1 rounded hover:bg-blue-100 transition text-sm font-semibold">
                            ĐĂNG NHẬP
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
