"use client"
import http from '@/src/request/httpConfig';
import { convertToDate, convertToDayjs } from '@/src/utils/datetime';
import { Button, Form, Popconfirm, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ClassType, Customer } from '../../request/model';
import ModalForm from './ModalForm';
import { Info } from 'lucide-react';
import Link from 'next/link';

type TableProps = {
  originData: Customer[];
  isReload: boolean;
  loading: boolean;
  setIsReload: (isReload: boolean) => void; 
  classes: ClassType[];
  classId: number;
};

const CustomTable = (props: TableProps) => {
  const {originData, isReload, loading, setIsReload, classes, classId} = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<Customer[]>(originData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentClass = classes.filter(e => e.id === classId)[0];

  useEffect(() => {
    setData(originData);
  }, [originData])

  const handleUpdate = (record: Partial<Customer>) => {
      form.setFieldsValue({...record, birthDate: convertToDayjs(record.birthDate)});
      setIsModalOpen(true)
  }

  const onDelete = (customer: Customer) => {
    http.delete(`/customers/${customer.id}`).then(() => setIsReload(!isReload));
  }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        http.patch<Customer>(`/customers/${form.getFieldValue("id")}`, values).then(() => {
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
      dataIndex: 'fullName',
      key: 'fullName',
      width: '20%',
      editable: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'mobile',
      width: '15%',
      key: 'mobile',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthDate',
      width: '10%',
      key: 'birthDate',
      render: (date: string) => {
        return convertToDate(date);
      }
    },
    {
      title: 'Lớp',
      dataIndex: 'className',
      width: '10%',
      key: 'className',
      render: () => {
        return currentClass.name;
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      width: '15%',
      key: 'address',
    },
    {
      title: 'Hành động',
      width: '20%',
      dataIndex: 'detail',
      render: (_: any, record: Customer) => {
        
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
               isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} classes={classes} />
      </div>
  );
};

export default CustomTable;