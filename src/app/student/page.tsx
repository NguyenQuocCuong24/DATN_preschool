"use client"
import CreateButton from "@/src/components/button/createButton";
import http from "@/src/request/httpConfig";
import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import LeftMenu from "../../components/sidebar/leftMenu";
import { ClassType, Customer } from "../../request/model";
import { ClassResponse, CustomerResponse } from "../../request/reponseType";
import CustomTable from "./TeacherTable";
import FilterBox from "./filterBox";

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

  const onChangeSelectClass = (value: string) => {
    console.log(`selected ${value}`);
  };
  
  const onSearchSelectClass = (value: string) => {
    console.log('search:', value);
  };

  console.log("classes: ", classes);
  
  return (
    <div className="flex">
        <LeftMenu />
        <div className="flex-1 px-24 py-4">
            <div className="text-large-bold">Danh sách học sinh</div>
            <div className="flex justify-between pt-4">
              {classes && classId && <FilterBox classes={classes} classId={classId} setClassId={setClassId}/>}
              <CreateButton onClick={() => setIsModalOpen(true)}/>
            </div>
            <div className="pt-8">
              {student && <CustomTable loading={loading} isReload={isReload} setIsReload={setIsReload} originData={student}/>}
            </div>
            {classId && <Modal
                title="Thêm mới học sinh"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okText="Tạo"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                  <Form.Item name="fullName" label="Tên học sinh" rules={[{ required: true, message: "Vui lòng nhập tên lớp học" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="mobile" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="avatarUrl" label="Ảnh đại diện" rules={[{ required: false, message: "Vui lòng nhập tên lớp học" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="classId" label="Chọn lớp học" rules={[{ required: true, message: "Vui lòng chọn lớp học" }]}>
                  <Select
                      showSearch
                      placeholder="Chọn lớp học"
                      optionFilterProp="label"
                      onChange={onChangeSelectClass}
                      onSearch={onSearchSelectClass}
                      filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                      }
                      options={classes.map(item => ({
                        value: item.id,
                        label: item.name
                      }))}
                    />
                  </Form.Item>
                </Form>
            </Modal>}
        </div>

        
    </div>
  );
}
