"use client"

import CreateButton from '@/src/components/button/createButton';
import LeftMenu from '@/src/components/sidebar/leftMenu';
import http from "@/src/request/httpConfig";
import { Form } from 'antd';
import { useEffect, useState } from "react";
import { Schedules } from "../../request/model";
import { ScheduleResponse } from "../../request/reponseType";
import ModalForm from './ModalForm';
import ScheduleCard from './ScheduleCard';

const prefix = "/schedules"

const Schedule = () => {
    const [schedules, setSchedules] = useState<Schedules[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [form] = Form.useForm();


    useEffect(() => {
        getAllSchedules();
    }, [isReload])

    const getAllSchedules = async () => {
        var response = await http.get<ScheduleResponse>(`${prefix}`);
        if(response.status === 200){
            setSchedules(response.payload.data);
        }
    }

    const handleOk = () => {
        form.validateFields()
          .then(values => {
            http.post<Schedules>(`${prefix}`, {...values}).then(() => setIsReload(!isReload));
            setIsModalOpen(false);
            form.resetFields();
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      };

    return (
        <div className="flex h-screen overflow-hidden">
        <LeftMenu />
        <div className="flex-1 px-24 py-4 overflow-y-auto">
            <div className="text-large-bold">Lịch trình</div>
            <div className="flex justify-between">
              <div></div>
              <CreateButton onClick={() => setIsModalOpen(true)}/>
            </div>   
            <div className="mt-8 w-full bg-white px-4 py-6">
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {schedules && schedules.map((data, index) => {
                    return (
                        <div key={index}>
                            <ScheduleCard schedule={data} index={index}  isReload={isReload} setIsReload={setIsReload}/>
                        </div>
                    )
                })}
                </div>
            </div>
            <ModalForm title={"Thêm lịch trình mới"} confirmText={"Tạo"} handleOk={handleOk} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} />
        </div>

        
    </div>
    );
};

export default Schedule;