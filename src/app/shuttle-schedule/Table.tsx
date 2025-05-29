"use client"
import http from '@/src/request/httpConfig';
import { convertToMonth } from '@/src/utils/datetime';
import { Form, Popconfirm, Table, Typography } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Schedule, ShuttleSchedule } from '../../request/model';
import ModalForm from './ModalForm';
import { isAdmin } from '@/src/utils/userInfo';
import dayjs from 'dayjs';

type TableProps = {
  originData: ShuttleSchedule[];
  isReload: boolean;
  loading: boolean;
  setIsReload: (isReload: boolean) => void; 
  schedules: Schedule[];
  scheduleId: number;
};

const prefix = "/shuttle-schedules"

const CustomTable = (props: TableProps) => {
  const {originData, isReload, loading, setIsReload, schedules, scheduleId} = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<ShuttleSchedule[]>(originData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    setData(originData);
  }, [originData])

  const handleUpdate = (record: Partial<ShuttleSchedule>) => {
      form.setFieldsValue({...record});
      setIsModalOpen(true)
  }

  const onDelete = (shuttleSchedule: ShuttleSchedule) => {
    http.delete(`${prefix}/${shuttleSchedule.id}`).then(() => setIsReload(!isReload));
  }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        console.log("22222: ", selectedDate);
        
        http.patch<ShuttleSchedule>(`${prefix}/${form.getFieldValue("id")}`, {...values, startTime: selectedDate.format("YYYY-MM-DD")}).then(() => {
            setIsModalOpen(false);
            form.resetFields();
            setIsReload(!isReload);
        })
    })
    .catch(info => {
    console.log("Validate Failed:", info);
    });
  };


  const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'row',
        width: '5%',
        render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Tên',
      dataIndex: 'customerName',
      key: 'customerName',
      width: '15%',
      editable: true,
    },
    {
      title: 'Lớp',
      dataIndex: 'className',
      key: 'className',
      width: '10%',
    },
    {
      title: 'Lịch trình',
      dataIndex: 'scheduleName',
      width: '15%',
      key: 'scheduleName',
    },
    {
      title: 'Điểm đón',
      dataIndex: 'pickUpAddress',
      width: '10%',
      key: 'pickUpAddress',
    },
    {
      title: 'Điểm trả',
      dataIndex: 'dropOffAddress',
      width: '10%',
      key: 'dropOffAddress',
    },
    {
      title: 'Tháng đăng ký',
      dataIndex: 'startTime',
      width: '15%',
      key: 'startTime',
      render: (startTime: string) => {
        return convertToMonth(startTime);
      }
    },
    {
      title: 'Hành động',
      width: '20%',
      dataIndex: 'detail',
      render: (_: any, record: ShuttleSchedule) => {
        if(isAdmin()){
          return (
            <div className='flex justify-between'>
              <Link href={`/student/${record.id}`}>
                <Typography.Link>
                  Chi tiết
                </Typography.Link>
              </Link>
              <div>|</div>
              <Typography.Link onClick={() => handleUpdate(record)}>
                Sửa
              </Typography.Link>
              <div>|</div>
              <Popconfirm title="Bạn có muốn xoá?" onConfirm={() => onDelete(record)} okText="Có" cancelText="Không">
                <a>Xoá</a>
              </Popconfirm>
            </div>
          )
        }
        return (
          <Link href={`/student/${record.id}`}>
                <Typography.Link>
                  Chi tiết
                </Typography.Link>
              </Link>
        )
      },
    },
  ];


  return (
    <div>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={data}
          loading={loading}
          columns={columns}
          rowClassName="editable-row"
          />
        </Form>
        <ModalForm title={"Sửa học sinh"} confirmText={"Sửa"} handleOk={handleOk} 
               isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} schedules={schedules} scheduleId={scheduleId} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </div>
  );
};

export default CustomTable;