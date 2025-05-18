'use client'
import Link from "next/link";
import { ReactElement } from "react";
import { usePathname } from 'next/navigation'

type ItemProps = {
    icon: ReactElement;
    name: String;
    route: string;
}
const LeftMenuItem = (props: ItemProps) => {
    const { icon, name, route } = props;
    const pathname = usePathname()
    return(
        <Link href={route} className="flex py-4 cursor-pointer">
            <div className="text-gray-500">{icon}</div>
            <div className={`pl-4 text-gray-normal ${pathname.includes(route) ? 'font-bold' : ''}`}>{name}</div>
        </Link>
    )
}

export default LeftMenuItem;