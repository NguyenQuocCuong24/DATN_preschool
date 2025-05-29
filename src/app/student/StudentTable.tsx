"use client"
import http from '@/src/request/httpConfig';
import { convertToDate, convertToDayjs } from '@/src/utils/datetime';
import { Form, Popconfirm, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ClassType, Customer } from '../../request/model';
import ModalForm from './ModalForm';
import { isAdmin } from '@/src/utils/userInfo';

type TableProps = {
  originData: Customer[];
  isReload: boolean;
  loading: boolean;
  setIsReload: (isReload: boolean) => void; 
  classes: ClassType[];
  classId: number;
  search: string;
};

const CustomTable = (props: TableProps) => {
  const {originData, isReload, loading, setIsReload, classes, classId, search} = props;
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


  const columns: ColumnsType<Customer> = [
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
        return <div>{convertToDate(date)}</div>;
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
        
        if (isAdmin()) {
          return(
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
          <div className='flex justify-between'>
            <Link href={`/student/${record.id}`}>
              <Typography.Link>
                Chi tiết
              </Typography.Link>
            </Link>
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
          dataSource={data.filter((item) =>
            item.fullName.toLowerCase().includes(search.toLowerCase())
          )}
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