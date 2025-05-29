"use client"
import { Customer } from '@/src/request/model';
import { Form, FormInstance, Input, Modal, Select } from "antd";

type ModalProps = {
    title: string;
    confirmText: string;
    handleOk: () => void; 
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    form: FormInstance;
    teachers: Customer[];
}

const ModalForm = (props: ModalProps) => {
    const {title, confirmText, handleOk, isModalOpen, setIsModalOpen, form, teachers } = props;
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    return (
        <div>
            <Modal
                title={title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                okText={confirmText}
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical">
                  <Form.Item name="name" label="Tên lớp học" rules={[{ required: true, message: "Vui lòng nhập tên lớp" }]}>
                      <Input />
                  </Form.Item>

                  <Form.Item name="teacherIdList" label="Chọn giáo viên" rules={[{ required: false, message: "Vui lòng chọn lớp học" }]}>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Chọn giáo viên"
                        onChange={handleChange}
                        options={teachers.map(item => {
                            return {
                                label: item.fullName + " - " + item.description,
                                value: item.id,
                            }
                        })}
                        />  
                  </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalForm;