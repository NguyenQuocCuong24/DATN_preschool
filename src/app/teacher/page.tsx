"use client"
import CreateButton from "@/src/components/button/createButton";
import http from "@/src/request/httpConfig";
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import { Customer } from "../../request/model";
import { CustomerResponse } from "../../request/reponseType";
import TeacherTable from "./TeacherTable";

export default function Teacher() {
    const [teacher, setTeacher] = useState<Customer[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [form] = Form.useForm();
    
    useEffect(() => {
        getTeachers();
    }, [isReload])
    
    const getTeachers = async () => {
        var response = await http.get<CustomerResponse>("/customers?customerType=TEACHER");
        if(response.status === 200){
            setTeacher(response.payload.data);
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
    <div className="flex">
        <LeftMenu />
        <div className="flex-1 px-24 py-4">
            <div className="text-large-bold">Giáo viên</div>
            <CreateButton onClick={() => setIsModalOpen(true)}/>
            <div className="pt-8">
              {teacher && <TeacherTable isReload={isReload} setIsReload={setIsReload} originData={teacher}/>}
            </div>
            <Modal
                title="Thêm mới giáo viên"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okText="Tạo"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                  <Form.Item name="fullName" label="Tên giáo viên" rules={[{ required: true, message: "Vui lòng nhập tên lớp học" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="mobile" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="avatarUrl" label="Ảnh đại diện" rules={[{ required: false, message: "Vui lòng nhập tên lớp học" }]}>
                      <Input />
                  </Form.Item>
                </Form>
            </Modal>
        </div>

        
    </div>
  );
}
