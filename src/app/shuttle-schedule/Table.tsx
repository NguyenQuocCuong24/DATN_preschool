"use client"
import http from '@/src/request/httpConfig';
import { convertToMonth } from '@/src/utils/datetime';
import { Form, Popconfirm, Table, Typography } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Schedule, ShuttleSchedule } from '../../request/model';
import ModalForm from './ModalForm';

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
        http.patch<ShuttleSchedule>(`${prefix}/${form.getFieldValue("id")}`, values).then(() => {
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
               isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} schedules={schedules} scheduleId={scheduleId}/>
      </div>
  );
};

export default CustomTable;