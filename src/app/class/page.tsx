"use client"
import CreateButton from "@/src/components/button/createButton";
import http from "@/src/request/httpConfig";
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import CustomTable from "./Table";
import { ClassResponse } from "@/src/request/reponseType";
import { ClassType } from "@/src/request/model";

const prefixApi = '/classes';
export default function Class() {
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [form] = Form.useForm();
    
    useEffect(() => {
        getAllClasses();
    }, [isReload])
    
    const getAllClasses = async () => {
        var response = await http.get<ClassResponse>(prefixApi);
        if(response.status === 200){
          setClasses(response.payload.data);
        }
    }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        http.post<ClassType>(prefixApi, {...values}
           ).then(() => setIsReload(!isReload));
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
            <div className="text-large-bold">Danh sách lớp học</div>
            <CreateButton onClick={() => setIsModalOpen(true)}/>
            <div className="pt-8">
              {classes && <CustomTable isReload={isReload} setIsReload={setIsReload} originData={classes}/>}
            </div>
            <Modal
                title="Thêm mới lớp học"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okText="Tạo"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                  <Form.Item name="name" label="Tên lớp học" rules={[{ required: true, message: "Vui lòng nhập tên lớp học" }]}>
                      <Input />
                  </Form.Item>
                </Form>
            </Modal>
        </div>

        
    </div>
  );
}
