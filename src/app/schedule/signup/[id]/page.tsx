"use client"

import LeftMenu from '@/src/components/sidebar/leftMenu';
import http from "@/src/request/httpConfig";
import { useEffect, useState } from "react";
import { Button, ConfigProvider, DatePicker, Form, FormInstance, Input, Select } from 'antd';
import { Schedules, ShuttleSchedule } from '@/src/request/model';
import { ScheduleResponse } from '@/src/request/reponseType';
import { useParams } from 'next/navigation';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

const prefix = "/schedules"

const ScheduleSignUp = () => {
    const params = useParams();
    const paramId = params.id as unknown as number;
    
    const [schedules, setSchedules] = useState<Schedules[]>();
    const [selected, setSelected] = useState<Schedules>();
    
    const [isReload, setIsReload] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [form] = Form.useForm();


    useEffect(() => {
        getAllSchedules();
    }, [isReload])

    const getAllSchedules = async () => {
        var response = await http.get<ScheduleResponse>(`${prefix}`);
        if(response.status === 200){
            const data = response.payload.data;
            const test = data.filter(e => e.id == paramId)[0];
            console.log("333: ", test);
            
            setSelected(data.filter(e => e.id == paramId)[0]);
            setSchedules(data);
        }
    }

    // can dang nhap de lay token
      const onFinish = (values: FormInstance) => {
        http.post<ShuttleSchedule>(`shuttle-schedules`, {...values, signedDate: selectedDate, customerId: 23}).then(() => {
            setIsReload(!isReload);
            form.resetFields();
        });
      };
    return (
        <div className="flex h-screen overflow-hidden">
        <LeftMenu />
        {schedules && <div className="flex-1 px-24 py-4 overflow-y-auto">
            <div className="text-large-bold">Đăng ký đi xe</div>
            <Form form={form} layout="vertical" onFinish={onFinish}>
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
                            setSelected(selectedItem); 
                          }}
                        options={schedules.map(item => ({
                            value: item.id,
                            label: item.name
                        }))}
                        />
                  </Form.Item>
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
                  
                  <Form.Item name="signedDate" label="Tháng đăng ký" initialValue={dayjs()} rules={[{ required: true, message: "Vui lòng chọn tháng đăng ký" }]}>
                    <ConfigProvider locale={viVN}>
                        <DatePicker picker="month"
                        value={selectedDate} 
                        onChange={(date) => setSelectedDate(date)}
                          format="MM/YYYY" className="w-full" />
                    </ConfigProvider>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" className='w-full' htmlType="submit">
                        Đăng ký
                    </Button>
                    </Form.Item>
                </Form>
        </div>

        }

        
    </div>
    );
};

export default ScheduleSignUp;