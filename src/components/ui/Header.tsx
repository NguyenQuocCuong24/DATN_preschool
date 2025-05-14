'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Header() {
    const router = useRouter()

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
                    <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700 font-medium">
                        <Link
                            href="/home"
                            className="border border-blue-500 px-3 py-1 rounded text-blue-600 font-semibold hover:bg-blue-50"
                        >
                            TRANG CHỦ
                        </Link>

                        {/* Dropdown shadcn menu dạng Checkbox */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="text-blue-600 font-semibold">
                                    TÍNH NĂNG
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64">
                                <DropdownMenuLabel>Danh mục chức năng</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                    onCheckedChange={() => router.push('/student_management')}
                                >
                                    Quản lý học sinh
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    onCheckedChange={() => router.push('/payroll-teacher')}
                                >
                                    Tính lương giáo viên
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    onCheckedChange={() => router.push('/nutrition')}
                                >
                                    Khẩu phần dinh dưỡng
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    onCheckedChange={() => router.push('/financial')}
                                >
                                    Quản lý thu chi
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    onCheckedChange={() => router.push('/messaging')}
                                >
                                    Tin nhắn
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Link href="#" className="hover:text-blue-600 transition">
                            SỔ SÁCH BÁN TRÚ
                        </Link>
                        <Link href="#" className="hover:text-blue-600 transition">
                            ĐĂNG KÝ
                        </Link>
                        <Link href="#" className="hover:text-blue-600 transition">
                            LIÊN HỆ
                        </Link>
                    </nav>

                    {/* Nút bên phải */}
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
    )
}
