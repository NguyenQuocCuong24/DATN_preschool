"use client"
import LeftMenu from "@/src/components/sidebar/leftMenu";
import http from "@/src/request/httpConfig";
import { Customer } from "@/src/request/model";
import { CustomerDetailResponse } from "@/src/request/reponseType";
import Avatar from "@/src/utils/Avatar";
import { Card, CardContent } from "@mui/material";
import { Descriptions } from "antd";
import dayjs from "dayjs";
import { BadgeInfo, Clock, FileType, Mail, MapPin, Phone, User } from "lucide-react";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

const ROLE_MAP: Record<string, string> = {
    TEACHER: 'Giáo viên',
    CUSTOMER: 'Học sinh'
  };

export default function TeacherDetail() {
    const params = useParams();
    const customerId = params.id;

    const [teacher, setTeacher] = useState<Customer | undefined>(undefined);
    useEffect(() => {
        getCustomer();
    }, [customerId])

    const getCustomer = async () => {
        var response = await http.get<CustomerDetailResponse>(`/customers/${customerId}`);
        if(response.status === 200){
            console.log(response.payload);
            
            setTeacher(response.payload);
        }
    }
    
  return (
    <div className="flex h-screen overflow-hidden">
        <LeftMenu />
        <div className="flex-1 px-24 py-4 overflow-y-auto">
            <div className="text-large-bold">Chi tiết học sinh</div>
            {teacher && 
                <Card className="shadow-md mt-8">
                    <CardContent className="flex flex-col md:flex-row gap-6 p-6">
                    <div className="flex flex-col items-center gap-2">
                        <Avatar size={120} name={teacher.fullName} />
                        <h2 className="text-xl pt-4 font-semibold">{teacher.fullName}</h2>
                    </div>

                    <div className="flex-1">
                        <Descriptions column={1} bordered size="middle">
                        <Descriptions.Item label={<span className="flex items-center gap-2"><Mail size={16} /> Email</span>}>
                            {teacher.email}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center gap-2"><Phone size={16} /> Điện thoại</span>}>
                            {teacher.mobile}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center gap-2"><User size={16} /> Ngày sinh</span>}>
                            {dayjs(teacher.birthDate).format("DD/MM/YYYY")}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center gap-2"><MapPin size={16} /> Địa chỉ</span>}>
                            {teacher.address}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center gap-2"><BadgeInfo size={16} /> Chức vụ</span>}>
                            {ROLE_MAP[teacher.customerType]}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center gap-2"><Clock size={16} /> Ngày tạo</span>}>
                            {dayjs(teacher.createdAt).format("HH:mm DD/MM/YYYY")}
                        </Descriptions.Item>
                        <Descriptions.Item label={<span className="flex items-center gap-2"><FileType size={16} /> Mô tả</span>}>
                            {teacher.description}
                        </Descriptions.Item>
                        </Descriptions>
                    </div>
                    </CardContent>
                </Card>
            }
        </div>
    </div>
    
  );
} 
