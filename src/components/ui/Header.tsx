'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
    Button,
    Menu,
    MenuItem,
    IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { motion } from 'framer-motion'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

export default function Header() {
    const router = useRouter()
    const pathname = usePathname()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)
    const [showMobileFeatureMenu, setShowMobileFeatureMenu] = useState(false)

    const open = Boolean(anchorEl)
    const mobileMenuOpen = Boolean(mobileMenuAnchor)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMobileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMenuAnchor(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        setMobileMenuAnchor(null)
        setShowMobileFeatureMenu(false)
    }

    const handleNavigate = (path: string) => {
        router.push(path)
        handleClose()
    }

    const mainLinks = [
        { label: 'TRANG CHỦ', href: '/', type: '' },
        { label: 'TÍNH NĂNG', href: '#', type: 'feature' },
        { label: 'SỔ SÁCH BÁN TRÚ', href: '/report' },
        { label: 'ĐĂNG KÝ', href: '/register' },
        { label: 'LIÊN HỆ', href: '/contact' },
    ]
    const featureLinks = [
        { label: 'Quản lý học sinh', href: '/student_management' },
        { label: 'Tính lương giáo viên', href: '/payroll-teacher' },
        { label: 'Khẩu phần dinh dưỡng', href: '/nutrition' },
        { label: 'Quản lý thu chi', href: '/bill_web' },
        { label: 'Tin nhắn', href: '/messaging' },
    ]

    return (
        <header>
            <div className="container mx-auto flex flex-col mb-4">
                <div className="container flex items-center justify-between mt-4">
                    {/* Logo */}
                    <Link href="/home_web">
                        <Image
                            src="/assets/images/logo-school.png"
                            alt="Logo"
                            width={300}
                            height={80}
                            className="cursor-pointer"
                        />
                    </Link>

                    {/* Mobile Hamburger Menu */}
                    <div className="md:hidden">
                        <IconButton onClick={handleMobileMenuClick}>
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            anchorEl={mobileMenuAnchor}
                            open={mobileMenuOpen}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            {mainLinks.map((link) => (
                                <MenuItem key={link.label} onClick={() => handleNavigate(link.href)}>
                                    {link.label}
                                </MenuItem>
                            ))}

                            {/* TÍNH NĂNG toggle */}
                            <MenuItem
                                onClick={() => setShowMobileFeatureMenu(prev => !prev)}
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                            >
                                <span>TÍNH NĂNG</span>
                                {showMobileFeatureMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                            </MenuItem>

                            {/* Feature submenu nếu được mở */}
                            {showMobileFeatureMenu && featureLinks.map((link) => (
                                <MenuItem
                                    key={link.label}
                                    onClick={() => handleNavigate(link.href)}
                                    sx={{ pl: 4 }}
                                >
                                    {link.label}
                                </MenuItem>
                            ))}

                            {/* Support & Login in mobile menu */}
                            <MenuItem>
                                <button className="w-full text-left border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-100 text-sm font-semibold">
                                    HỖ TRỢ
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <Link href={"/login"}>
                                    <button className="cursor-pointer w-full text-left border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-100 text-sm font-semibold">
                                        ĐĂNG NHẬP
                                    </button>
                                </Link>
                            </MenuItem>
                        </Menu>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700 font-medium relative">
                        {mainLinks.map((link) => {
                            const isActive = pathname === link.href

                            if (link.type === 'primary') {
                                return (
                                    <div key={link.label} className="relative px-2 py-1">
                                        <Link
                                            href={link.href}
                                            className={`border border-blue-300 px-3 py-1 rounded font-normal transition-colors ${isActive ? 'text-blue-600' : 'text-blue-500 hover:bg-blue-50'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                        {isActive && (
                                            <motion.div
                                                layoutId="underline"
                                                className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-600 rounded"
                                            />
                                        )}
                                    </div>
                                )
                            }

                            if (link.type === 'feature') {
                                return (
                                    <div key={link.label}>
                                        <Button
                                            onClick={handleClick}
                                            endIcon={<KeyboardArrowDownIcon />}
                                            className="text-blue-600 font-semibold"
                                        >
                                            {link.label}
                                        </Button>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                        >
                                            {featureLinks.map((feature) => (
                                                <MenuItem
                                                    key={feature.label}
                                                    onClick={() => handleNavigate(feature.href)}
                                                >
                                                    {feature.label}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                )
                            }

                            return (
                                <div key={link.label} className="relative px-2 py-1">
                                    <Link
                                        href={link.href}
                                        className={`transition-colors ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-500 text-gray-800'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                    {isActive && (
                                        <motion.div
                                            layoutId="underline"
                                            className="absolute left-0 right-0 bottom-0 h-[2px] bg-blue-600 rounded"
                                        />
                                    )}
                                </div>
                            )
                        })}
                    </nav>

                    {/* Desktop Support & Login Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <button className="border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 text-sm font-semibold">
                            HỖ TRỢ
                        </button>
                        <Link href={"/login"}>
                            <button className="cursor-pointer border border-blue-500 text-blue-500 px-3 py-1 rounded hover:bg-blue-50 text-sm font-semibold">
                                ĐĂNG NHẬP
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
