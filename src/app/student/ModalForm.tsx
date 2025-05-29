import React from 'react';
import { DatePicker, Form, FormInstance, Input, Modal, Select } from "antd";
import { ClassType } from '@/src/request/model';

type ModalProps = {
    title: string;
    confirmText: string;
    handleOk: () => void; 
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    form: FormInstance;
    classes: ClassType[];
}

const ModalForm = (props: ModalProps) => {
    const {title, confirmText, handleOk, isModalOpen, setIsModalOpen, form, classes } = props;
    
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
                  <Form.Item name="fullName" label="Tên học sinh" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="mobile" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Địa chỉ email" rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: "Vui lòng nhập địa chỉ"}]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="description" label="Phụ huynh" rules={[{ required: true,message: "Vui lòng nhập phụ huynh"}]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="birthDate" label="Ngày sinh" rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}>
                      <DatePicker className='w-full'/>
                  </Form.Item>

                  <Form.Item name="classId" label="Chọn lớp học" rules={[{ required: true, message: "Vui lòng chọn lớp học" }]}>
                    <Select
                        showSearch
                        placeholder="Chọn lớp học"
                        optionFilterProp="label"
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
            </Modal>
        </div>
    );
};

export default ModalForm;