"use client"

import LeftMenu from '@/src/components/sidebar/leftMenu';
import http from "@/src/request/httpConfig";
import { ClassType, Customer, Schedule, ShuttleSchedule } from '@/src/request/model';
import { ClassResponse, CustomerResponse, ScheduleResponse } from '@/src/request/reponseType';
import { getCustomerId, getCustomerInfo, isAdmin, isCustomer } from '@/src/utils/userInfo';
import { Button, ConfigProvider, DatePicker, Form, Select } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


const prefix = "/schedules"

interface FormField {
    scheduleId: number;
    classId: number;
    customerId: number;
    pickUpAddress: string;
    dropOffAddress: string;
    startTime: Date;
}

const ScheduleSignUp = () => {
    const router = useRouter()

    const params = useParams();
    const paramId = params.id as unknown as number;

    const [schedules, setSchedules] = useState<Schedule[]>();
    const [selected, setSelected] = useState<Schedule>();
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [classId, setClassId] = useState<number>();
    const [student, setStudent] = useState<Customer[]>([]);
    const [isReload, setIsReload] = useState<boolean>(false)
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [form] = Form.useForm<FormField>();


    useEffect(() => {
        getAllSchedules();
    }, [isReload])

    const getAllSchedules = async () => {
        const response = await http.get<ScheduleResponse>(`${prefix}`);
        if (response.status === 200) {
            const data = response.payload.data;
            setSelected(data.filter(e => e.id == paramId)[0]);
            setSchedules(data);
        }
    }
    useEffect(() => {
        getAllStudents();
    }, [isReload, classId])

    useEffect(() => {
        getAllClasses();
    }, [])

    const getAllStudents = async () => {
        const response = await http.get<CustomerResponse>(`/customers?customerType=CUSTOMER&classId=${classId}`);
        if (response.status === 200) {
            setStudent(response.payload.data);
        }
    }

    const getAllClasses = async () => {
        const response = await http.get<ClassResponse>("/classes");
        if (response.status === 200) {
            setClasses(response.payload.data);
            if (isCustomer()) {
                setClassId(getCustomerInfo().classId);
            } else {
                setClassId(response.payload.data[response.payload.data.length - 1].id);
            }
        }
    }

    const onFinish = (values: FormField) => {
        let body = { ...values, startTime: selectedDate };
        if (isCustomer()) {
            body = { ...body, customerId: getCustomerId() }
        }
        http.post<ShuttleSchedule>(`shuttle-schedules`, body).then((response) => {
            if (response.status == 200 || response.status == 201) {
                setIsReload(!isReload);
                form.resetFields();
                console.log("4444449999");
               
                setTimeout(function () {
                    router.push(`/shuttle-schedule?scheduleId=${values.scheduleId}`)
                }, 3000);
            }
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
                    {isAdmin() && classes && <Form.Item name="classId" label="Chọn lớp học" rules={[{ required: true, message: "Vui lòng chọn lớp học" }]}>
                        <Select
                            showSearch
                            placeholder="Chọn lớp học"
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            onChange={(id) => setClassId(id)}
                            options={classes.map(item => ({
                                value: item.id,
                                label: item.name
                            }))}
                        />
                    </Form.Item>}

                    {isCustomer() && classes && <Form.Item name="classId" label="Chọn lớp học" rules={[{ required: false, message: "Vui lòng chọn lớp học" }]}>
                        <Select
                            disabled
                            showSearch
                            placeholder="Chọn lớp học"
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            defaultValue={getCustomerInfo().classId}
                            options={classes.map(item => ({
                                value: item.id,
                                label: item.name
                            }))}
                        />
                    </Form.Item>}
                    {isAdmin() && student && <Form.Item name="customerId" label="Chọn học sinh" rules={[{ required: true, message: "Vui lòng chọn học sinh" }]}>
                        <Select
                            showSearch
                            placeholder="Chọn học sinh"
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={student.map(item => ({
                                value: item.id,
                                label: item.fullName
                            }))}
                        />
                    </Form.Item>}

                    {isCustomer() && student && <Form.Item name="classId" label="Chọn học sinh" rules={[{ required: false, message: "Vui lòng chọn lớp học" }]}>
                        <Select
                            disabled
                            showSearch
                            placeholder="Chọn lớp học"
                            optionFilterProp="label"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            defaultValue={getCustomerInfo().customerId}
                            options={student.map(item => ({
                                value: item.id,
                                label: item.fullName
                            }))}
                        />
                    </Form.Item>}
                    <Form.Item name="pickUpAddress" label="Địa điểm đón" rules={[{ required: true, message: "Vui lòng chọn điểm đón" }]}>
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
                    <Form.Item name="dropOffAddress" label="Địa điểm trả" rules={[{ required: true, message: "Vui lòng chọn điểm trả" }]}>
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