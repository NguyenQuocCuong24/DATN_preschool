"use client"
import CreateButton from "@/src/components/button/createButton";
import http from "@/src/request/httpConfig";
import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import { ClassType, Customer } from "../../request/model";
import { ClassResponse, CustomerResponse } from "../../request/reponseType";
import CustomTable from "./StudentTable";
import FilterBox from "./filterBox";
import ModalForm from "./ModalForm";

export default function Teacher() {
    const [student, setStudent] = useState<Customer[]>([]);
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [classId, setClassId] = useState<number>();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [form] = Form.useForm();
    
    useEffect(() => {
      getAllStudents();
    }, [isReload, classId])

    useEffect(() => {
      getAllClasses();
    }, [])
    
    const getAllStudents = async () => {
        var response = await http.get<CustomerResponse>(`/customers?customerType=CUSTOMER&classId=${classId}`);
        if(response.status === 200){
          setStudent(response.payload.data);
          setLoading(false);
        }
    }

    const getAllClasses = async () => {
      var response = await http.get<ClassResponse>("/classes");
      if(response.status === 200){
        setClasses(response.payload.data);
        setClassId(response.payload.data[response.payload.data.length - 1].id);
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
            <div className="text-large-bold">Danh sách học sinh</div>
            <div className="flex justify-between pt-4">
              <div className="flex">
                <div className="pr-4 pt-1">Chọn lớp học: </div>
                {classes && classId && <FilterBox classes={classes} classId={classId} setClassId={setClassId}/>}
              </div>
              <CreateButton onClick={() => setIsModalOpen(true)}/>
            </div>
            <div className="pt-8">
              {student && classId && <CustomTable loading={loading} isReload={isReload} setIsReload={setIsReload} originData={student} classes={classes} classId={classId}/>}
            </div>
            {classId && <ModalForm title={"Thêm mới học sinh"} confirmText={"Tạo"} handleOk={handleOk}
               isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} classes={classes} />}
        </div>
    </div>
  );
}
