"use client"
import { Button } from "antd";
import { CalendarCheck2, Car, CarFront, ClipboardList, CookingPot, House, LogOut, Receipt, Table2, Users, Users2 } from "lucide-react";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import LeftMenuItem from "./item";
import { getCustomerInfo } from "@/src/utils/userInfo";
import { ROLE_MAP } from "@/src/utils/config";
import { useEffect, useState } from "react";
import { JwtPayload } from "jwt-decode";


const LeftMenu = () => {
  const handleLogout = async () => {
    localStorage.removeItem("token");
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/login';
  }

  const [userInfo, setUserInfo] = useState<JwtPayload>();

  useEffect(() => {
    const info = getCustomerInfo();
    setUserInfo(info as JwtPayload);
  }, []);

  return (
    <div className="w-1/5 h-screen flex-shrink-0 min-h-screen bg-white flex flex-col">
      <ToastContainer />

      <div className="mt-4 text-center p-4 text-large-bold mx-auto">Quản lý <br /> mầm non</div>
      <div className="">
        <LeftMenuItem name={"Tổng quan"} icon={<House />} route="/home" />
        <LeftMenuItem name={"Học sinh"} icon={<Users />} route="/student" />
        <LeftMenuItem name={"Giáo viên"} icon={<Users2 />} route="/teacher" />
        <LeftMenuItem name={"Lớp học"} icon={<Table2 />} route="/class" />
        <LeftMenuItem name={"Điểm danh"} icon={<ClipboardList />} route="/attendance" />
        <LeftMenuItem name={"Lịch trình"} icon={<CalendarCheck2 />} route="/schedule" />
        <LeftMenuItem name={"Điểm danh đi xe"} icon={<CarFront />} route="/driver-attendance" />
        <LeftMenuItem name={"Quản lý đi xe"} icon={<Car />} route="/shuttle-schedule" />
        <LeftMenuItem name={"Quản lý thực đơn"} icon={<CookingPot />} route="/menu" />
        <LeftMenuItem name={"Quản lý hoá đơn"} icon={<Receipt />} route="/bill" />
      </div>

      <div className="mt-auto text-normal mb-4">
        <hr />
        {userInfo && <div className="flex p-8">
          <Image
            src={'https://cdn3.iconfinder.com/data/icons/women-avatars/314/2-01-512.png'}
            alt='image'
            width={50}
            height={40}
          />
          <div className="pl-4">
            <div>{userInfo.fullName}</div>
            <div>{ROLE_MAP[userInfo.customerType]}</div>
          </div>
        </div>}

        <Button onClick={handleLogout} className="cursor-pointer w-full py-8" color="default" variant="filled" icon={<LogOut />} size={"large"}>
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}

export default LeftMenu;
