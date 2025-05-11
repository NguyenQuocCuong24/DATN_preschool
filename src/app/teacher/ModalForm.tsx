import React from 'react';
import { DatePicker, Form, FormInstance, Input, Modal } from "antd";

type ModalProps = {
    title: String;
    confirmText: String;
    handleOk: () => void; 
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    form: FormInstance;
}

const ModalForm = (props: ModalProps) => {
    const {title, confirmText, handleOk, isModalOpen, setIsModalOpen, form } = props;
    
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
                  <Form.Item name="fullName" label="Tên giáo viên" rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="mobile" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Địa chỉ email" rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="description" label="Bằng cấp" rules={[{ required: false}]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="address" label="Địa chỉ" rules={[{ required: false}]}>
                      <Input />
                  </Form.Item>
                  <Form.Item name="birthDate" label="Ngày sinh" rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}>
                      <DatePicker className='w-full'/>
                  </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalForm;