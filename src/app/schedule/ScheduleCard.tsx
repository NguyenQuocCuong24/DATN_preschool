import http from '@/src/request/httpConfig';
import { Customer, Schedules } from '@/src/request/model';
import { Form, Popconfirm } from "antd";
import Link from 'next/link';
import { useState } from 'react';
import ModalForm from './ModalForm';
import RouteSteps from './RouteSteps';


type TeacherCardProps = {
  schedule: Schedules;
  isReload: boolean;
  index: number;
  setIsReload: (isReload: boolean) => void; 
};

const prefix = "/schedules"

const ScheduleCard = (props: TeacherCardProps) => {
    const {schedule, index, isReload, setIsReload} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    
    const handleUpdate = () => {
        form.setFieldsValue({...schedule});
        setIsModalOpen(true)
    }

    const handleOk = () => {
        form.validateFields()
          .then(values => {
            http.patch<Customer>(`${prefix}/${schedule.id}`, {...schedule, ...values}).then(() => {
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
        http.delete(`${prefix}/${schedule.id}`).then(() => setIsReload(!isReload));
      }

    return (
        <div className="mb-4 w-[95%] bg-white border border-gray-300 rounded-xl shadow-sm px-4 pt-4 space-y-3">
            <p className='text-normal-bold'>Lộ trình {index + 1}</p>
            <RouteSteps locations={schedule.routes}/>

            <div className="flex justify-end gap-2 py-4 border-t border-gray-300 mt-2">
                <Link href={`/schedule/signup/${schedule.id}`}>
                    <button className="cursor-pointer px-3 py-1 rounded-md border border-gray-300 font-medium text-sm">Đăng ký</button>
                </Link>
                <button onClick={handleUpdate} className="cursor-pointer px-3 py-1 rounded-md text-white bg-button-primary hover:bg-indigo-700 text-sm">
                    Sửa
                </button>
                <Popconfirm title="Bạn có muốn xoá?" onConfirm={onDelete} okText="Có" cancelText="Không" >
                    <button className="cursor-pointer bg-red-500 color px-3 py-1 rounded-md border border-gray-300 font-medium text-sm">Xoá</button>

                </Popconfirm>
            </div>
            <ModalForm title={"Sửa giáo viên"} confirmText={"Sửa"} handleOk={handleOk} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} />
    </div>
    );
};

export default ScheduleCard;