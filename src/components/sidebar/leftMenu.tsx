import Image from "next/image";
import LeftMenuItem from "./item";
import { CalendarCheck2, ClipboardList, House, Table2, Users, Users2 } from "lucide-react";

const LeftMenu = () => {
    return (
        <div className="w-1/5 min-h-screen bg-white flex flex-col">
            <div className="mt-8 text-center p-4 text-large-bold mx-auto">Quản lý <br /> mầm non</div>
            <div className="p-8">
              <LeftMenuItem name={"Tổng quan"} icon={<House />} route="/"/>
              <LeftMenuItem name={"Học sinh"} icon={<Users />} route="/student"/>
              <LeftMenuItem name={"Giáo viên"} icon={<Users2 />} route="/teacher"/>
              <LeftMenuItem name={"Lớp học"} icon={<Table2 />} route="/class"/>
              <LeftMenuItem name={"Điểm danh"} icon={<ClipboardList />} route="/"/>
              {/* <LeftMenuItem name={"Lịch"} icon={<CalendarCheck2 />} route="/"/> */}
            </div>
            
            <div className="mt-auto text-normal mb-4">
              <hr />
              <div className="flex p-8">
                <Image
                    src={'https://cdn3.iconfinder.com/data/icons/women-avatars/314/2-01-512.png'}
                    alt='image'
                    width={50}
                    height={40}
                  />
                <div className="pl-4">
                  <div>Nguyễn Thị Minh</div>
                  <div>Quản trị viên</div>
                </div>
              </div>
            </div>
      </div>
    );
  }

  export default LeftMenu;
