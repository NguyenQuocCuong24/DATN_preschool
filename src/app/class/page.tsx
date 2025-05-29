"use client"
import CreateButton from "@/src/components/button/createButton";
import http from "@/src/request/httpConfig";
import { ClassTeacher, ClassType, Customer } from "@/src/request/model";
import { ClassResponse, CustomerResponse } from "@/src/request/reponseType";
import { Form } from "antd";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import ModalForm from "./ModalForm";
import CustomTable from "./Table";
import Loading from "@/src/components/loading";

const prefixApi = '/classes';
export default function Class() {
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [form] = Form.useForm();
    const [teacher, setTeacher] = useState<Customer[]>([]);
        
    useEffect(() => {
        getTeachers();
    }, [])
        
    const getTeachers = async () => {
        const response = await http.get<CustomerResponse>("/customers?customerType=TEACHER");
        if(response.status === 200){
            setTeacher(response.payload.data);
        }
    }
    
    useEffect(() => {
        getAllClasses();
    }, [isReload])
    
    const getAllClasses = async () => {
        const response = await http.get<ClassResponse>(prefixApi);
        if(response.status === 200){
          setClasses(response.payload.data);
          setLoading(false);
        }
    }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        http.post<ClassType>(prefixApi, {...values}).then(async (record) => {
          const promises = values.teacherIdList.map((customerId: number) => createClassTeacher(record.payload.id, customerId));
          await Promise.all(promises);
        });
        setIsReload(!isReload)
        setIsModalOpen(false);
        form.resetFields();
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  async function createClassTeacher(classId: number, customerId: number): Promise<ClassTeacher> {
    const response = await http.post<ClassTeacher>("/class-teachers", {classId: classId, customerId: customerId});
    return response.payload;
  }

  return (
    <div className="flex h-screen overflow-hidden">
        <LeftMenu />
        {loading ? <Loading /> : <div className="flex-1 px-24 py-4 overflow-y-auto">
            <div className="text-large-bold">Danh sách lớp học</div>
            <div className="flex justify-between">
              <div></div>
              <CreateButton onClick={() => setIsModalOpen(true)}/>
            </div>
            <div className="pt-8">
              {classes && <CustomTable isReload={isReload} setIsReload={setIsReload} originData={classes} teachers={teacher}/>}
            </div>
            {teacher && <ModalForm title={"Thêm mới lớp học"} confirmText={"Tạo"} handleOk={handleOk}
               isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} teachers={teacher}/>}
        </div>}

        
    </div>
  );
}
