"use client"
import CreateButton from "@/src/components/button/createButton";
import http from "@/src/request/httpConfig";
import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import { ClassType, Customer, Schedules, ShuttleSchedule } from "../../request/model";
import { ClassResponse, CustomerResponse, ScheduleResponse, ShuttleScheduleResponse } from "../../request/reponseType";
import CustomTable from "./StudentTable";
import ModalForm from "./ModalForm";
import FilterBox from "./filterBox";

export default function Teacher() {
    const [shuttleSchedule, setShuttleSchedule] = useState<ShuttleSchedule[]>([]);
    const [schedules, setSchedules] = useState<Schedules[]>([]);
    const [scheduleId, setScheduleId] = useState<number>();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [form] = Form.useForm();
    
    useEffect(() => {
      getAllStudents();
    }, [isReload, scheduleId])

    useEffect(() => {
      getAllSchedules();
    }, [])
    
    const getAllStudents = async () => {
        var response = await http.get<ShuttleScheduleResponse>(`/shuttle-schedules?scheduleId=${scheduleId}`);
        if(response.status === 200){
          setShuttleSchedule(response.payload.data);
          setLoading(false);
        }
    }

    const getAllSchedules = async () => {
      var response = await http.get<ScheduleResponse>("/schedules");
      if(response.status === 200){
        setSchedules(response.payload.data);
        setScheduleId(response.payload.data[response.payload.data.length - 1].id);
      }
    }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        http.post<Customer>("/customers", {...values, status: "Active",
           customerType: "CUSTOMER", password: "abc123"}).then(() => setIsReload(!isReload));
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
            <div className="text-large-bold">Danh sách học sinh đăng ký đi xe</div>
            <div className="flex justify-between pt-4">
              <div className="flex">
                <div className="pr-4 pt-1">Chọn lịch trình: </div>
                {schedules && scheduleId && <FilterBox schedules={schedules} scheduleId={scheduleId} setScheduleId={setScheduleId}/>}
              </div>
              <CreateButton onClick={() => setIsModalOpen(true)}/>
            </div>
            <div className="pt-8">
              {shuttleSchedule && scheduleId && <CustomTable loading={loading} isReload={isReload} setIsReload={setIsReload} originData={shuttleSchedule} schedules={schedules} scheduleId={scheduleId}/>}
            </div>
            {/* {scheduleId && <ModalForm title={"Thêm mới học sinh"} confirmText={"Tạo"} handleOk={handleOk}
               isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} classes={schedules} />} */}
        </div>
    </div>
  );
}
