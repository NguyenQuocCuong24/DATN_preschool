"use client"
import { Schedule } from '@/src/request/model';
import { ConfigProvider, DatePicker, Form, FormInstance, Modal, Select } from "antd";
import viVN from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

type ModalProps = {
    title: String;
    confirmText: String;
    handleOk: () => void; 
    isModalOpen: boolean;
    setIsModalOpen: (value: boolean) => void;
    form: FormInstance;
    schedules: Schedule[];
    scheduleId: number;
}

const ModalForm = (props: ModalProps) => {
    const searchParams = useSearchParams()
    const id = searchParams.get('scheduleId') || 0;
    const {title, confirmText, handleOk, isModalOpen, setIsModalOpen, form, schedules, scheduleId } = props;
    const [selected, setSelected] = useState<Schedule>();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    useEffect(() => {
        setSelected(schedules.find(e => e.id == scheduleId));
    }, [schedules])
    
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
                  <Form.Item name="scheduleId" label="Lịch trình" initialValue={selected?.id} rules={[{ required: true, message: "Vui lòng chọn lịch trình" }]}>
                    <Select
                        showSearch
                        placeholder="Chọn lịch trình"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={(val) => {
                            const selectedItem = schedules.find(item => item.id === val);
                            if (selectedItem) {
                                setSelected(selectedItem); 
                            }
                          }}
                        options={schedules.map(item => ({
                            value: item.id,
                            label: item.name
                        }))}
                        />
                  </Form.Item>

                    {<Form.Item name="className" label="Chọn lớp học" >
                        <Select
                            disabled
                            showSearch
                            placeholder="Chọn lớp học"
                            optionFilterProp="label"
                            />
                    </Form.Item>}
                    
                    {<Form.Item name="customerName" label="Chọn học sinh" >
                        <Select
                            disabled
                            showSearch
                            placeholder={form.getFieldsValue().customerName}
                            optionFilterProp="label"
                            />
                    </Form.Item>}
                  <Form.Item name="pickUpAddress" label="Địa điểm đón" rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}>
                  <Select
                        showSearch
                        placeholder="Điểm đón"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={selected?.routes.map(item => ({
                            value: item,
                            label: item
                        }))}
                        />
                  </Form.Item>
                  <Form.Item name="dropOffAddress" label="Địa điểm trả" rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                  <Select
                        showSearch
                        placeholder="Điểm trả"
                        optionFilterProp="label"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={selected?.routes.map(item => ({
                            value: item,
                            label: item
                        }))}
                        />
                  </Form.Item>
                  
                  <Form.Item name="startTime" label="Tháng đăng ký" initialValue={dayjs()} rules={[{ required: true, message: "Vui lòng chọn tháng đăng ký" }]}>
                    <ConfigProvider locale={viVN}>
                        <DatePicker picker="month"
                        value={selectedDate} 
                        onChange={(date) => setSelectedDate(date)}
                          format="MM/YYYY" className="w-full" />
                    </ConfigProvider>
                  </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ModalForm;