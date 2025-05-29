import http from '@/src/request/httpConfig';
import { Customer } from '@/src/request/model';
import Avatar from '@/src/utils/Avatar';
import { convertToDayjs } from '@/src/utils/datetime';
import { Form, Popconfirm } from "antd";
import { Calendar, Mail, Phone } from "lucide-react";
import { useState } from 'react';
import ModalForm from './ModalForm';
import Link from 'next/link';
import { isAdmin } from '@/src/utils/userInfo';


type TeacherCardProps = {
  teacher: Customer;
  isReload: boolean;
  setIsReload: (isReload: boolean) => void; 
};

const TeacherCard = (props: TeacherCardProps) => {
    const {teacher, isReload, setIsReload} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    
    const handleUpdate = () => {
        form.setFieldsValue({...teacher, birthDate: convertToDayjs(teacher.birthDate)});
        setIsModalOpen(true)
    }

    const handleOk = () => {
        form.validateFields()
          .then(values => {
            http.patch<Customer>(`/customers/${teacher.id}`, {...teacher, ...values}).then(() => {
                setIsModalOpen(false);
                form.resetFields();
                setIsReload(!isReload);
            })
        })
        .catch(info => {
        console.log("Validate Failed:", info);
        });
    };

    const onDelete = () => {
        http.delete(`/customers/${teacher.id}`).then(() => setIsReload(!isReload));
      }

    return (
        <div className="mb-4 w-[90%] max-w-sm bg-white border border-gray-300 rounded-xl shadow-sm px-4 pt-4 space-y-3">
            <div className="flex items-start gap-4">
                <Avatar name={teacher.fullName}/>
                <div>
                <h3 className="text-base font-semibold text-gray-800">{teacher.fullName}</h3>
                <p className="text-sm text-gray-500">{teacher?.description}</p>
                </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>{teacher.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{teacher?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Bắt đầu: {new Date(teacher.createdAt).toLocaleDateString("vi-VN")}</span>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-300 mt-2">
                <Link href={`/teacher/${teacher.id}`}>
                    <button className="cursor-pointer px-3 py-1 rounded-md border border-gray-300 font-medium text-sm">Chi tiết</button>
                </Link>
                {isAdmin() && <div>
                    <button onClick={handleUpdate} className="cursor-pointer mr-2 px-3 py-1 rounded-md text-white bg-button-primary hover:bg-indigo-700 text-sm">
                        Sửa
                    </button>
                    <Popconfirm title="Bạn có muốn xoá?" onConfirm={onDelete} okText="Có" cancelText="Không" >
                        <button className="cursor-pointer bg-red-500 color px-3 py-1 rounded-md border border-gray-300 font-medium text-sm">Xoá</button>
                    </Popconfirm>
                </div>}
            </div>
            <ModalForm title={"Sửa giáo viên"} confirmText={"Sửa"} handleOk={handleOk} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} />
    </div>
    );
};

export default TeacherCard;