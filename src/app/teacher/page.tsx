"use client"
import CreateButton from "@/src/components/button/createButton";
import http from "@/src/request/httpConfig";
import { Form } from "antd";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import { Customer } from "../../request/model";
import { CustomerResponse } from "../../request/reponseType";
import ModalForm from "./ModalForm";
import TeacherCard from "./TeacherCard";
import Loading from "@/src/components/loading";

export default function Teacher() {
    const [teacher, setTeacher] = useState<Customer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [form] = Form.useForm();
    
    useEffect(() => {
        getTeachers();
    }, [isReload])
    
    const getTeachers = async () => {
        const response = await http.get<CustomerResponse>("/customers?customerType=TEACHER");
        if(response.status === 200){
            setTeacher(response.payload.data);
            setLoading(false);
        }
    }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        http.post<Customer>("/customers", {...values, status: "Active",
           customerType: "TEACHER", password: "abc123"}).then(() => setIsReload(!isReload));
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
        {loading ? <Loading /> : <div className="flex-1 px-24 py-4 overflow-y-auto">
            <div className="text-large-bold">Giáo viên</div>
            <div className="flex justify-between">
              <div></div>
              <CreateButton onClick={() => setIsModalOpen(true)}/>
            </div>
            <div className="mt-8 w-full bg-white px-4 py-6">
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {teacher && teacher.map((value, key) => {
                  return(
                    <TeacherCard key={key} teacher={value} isReload={isReload} setIsReload={setIsReload}/>
                  )
                })}
              </div>
            </div>
            <ModalForm title={"Thêm mới giáo viên"} confirmText={"Tạo"} handleOk={handleOk} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} />
        </div>}

        
    </div>
  );
}
