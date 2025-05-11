"use client"
import http from '@/src/request/httpConfig';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Modal, Popconfirm, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { Customer } from '../../request/model';


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Customer;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Vui lòng nhập ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

type TeacherTableProps = {
  originData: Customer[];
  isReload: boolean;
  setIsReload: (isReload: boolean) => void; 
};

const TeacherTable = (props: TeacherTableProps) => {
  const {originData, isReload, setIsReload} = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<Customer[]>(originData);
  const [editingKey, setEditingKey] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(originData);
  }, [originData])
  

  const isEditing = (record: Customer) => record.id === editingKey;

  const edit = (record: Partial<Customer>) => {
    form.setFieldsValue({ fullName: '', mobile: '', status: '', ...record });
    setEditingKey(record.id || 0);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const onDelete = (customer: Customer) => {
    http.delete(`/customers/${customer.id}`).then(() => setIsReload(!isReload));
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Customer;
      
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
          
        const item = newData[index];
        const result = {...item, ...row};
        updateToDB(result);
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey(0);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(0);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const updateToDB = async (customer: Customer) => {
    http.patch<Customer>(`/customers/${customer.id}`, customer)
  }

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
      width: '25%',
      editable: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'mobile',
      width: '20%',
      key: 'mobile',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: '20%',
      key: 'status',
    },
    {
      title: 'Chi tiết',
      width: '10%',
      dataIndex: 'detail',
      render: (_: any, record: Customer) => {
        
        return (
          <Typography.Link onClick={() => setIsModalOpen(true)} style={{ marginInlineEnd: 12 }}>
              Chi tiết
            </Typography.Link>
        )
      },
    },
    {
      title: 'Sửa',
      width: '15%',
      dataIndex: 'update',
      render: (_: any, record: Customer) => {
        
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginInlineEnd: 12 }}>
              Cập nhật
            </Typography.Link>
            <Popconfirm title="Bạn có muốn huỷ?" onConfirm={cancel} okText="Có" cancelText="Không" >
              <a>Huỷ</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== 0} onClick={() => edit(record)}>
            Sửa
          </Typography.Link>
        );
      },
    },
    {
      title: 'Xoá',
      width: "10%",
      dataIndex: 'delete',
      render: (_: any, record: Customer) => {
        
        return (
          <Popconfirm title="Bạn có muốn xoá?" onConfirm={() => onDelete(record)} okText="Có" cancelText="Không" >
              <a>Xoá</a>
            </Popconfirm>
        )
      },
    },
  ];

  const mergedColumns: TableProps<Customer>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Customer) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });



  return (
    <div>
      <Form form={form} component={false}>
        <Table<Customer>
          components={{
            body: { cell: EditableCell },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{ onChange: cancel }}
          />
        </Form>
        <Modal
          title="Thông tin chi tiết"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
            <div>Chưa kịp thiết kế chi tiết</div>    
        </Modal>
      </div>
  );
};

export default TeacherTable;