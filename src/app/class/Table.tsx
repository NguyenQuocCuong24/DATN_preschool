"use client"
import http from '@/src/request/httpConfig';
import { ClassType } from '@/src/request/model';
import type { TableProps } from 'antd';
import { Form, Input, InputNumber, Modal, Popconfirm, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ClassDetail from './ClassDetail';

const prefixApi = '/classes';
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: ClassType;
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
  originData: ClassType[];
  isReload: boolean;
  setIsReload: (isReload: boolean) => void; 
};

const CustomTable = (props: TeacherTableProps) => {
  const {originData, isReload, setIsReload} = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<ClassType[]>(originData);
  const [selectData, setSelectData] = useState<ClassType>();
  const [editingKey, setEditingKey] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(originData);
  }, [originData])
  

  const isEditing = (record: ClassType) => record.id === editingKey;

  const edit = (record: Partial<ClassType>) => {
    form.setFieldsValue({ fullName: '', mobile: '', status: '', ...record });
    setEditingKey(record.id || 0);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const onDelete = (classType: ClassType) => {
    http.delete(`${prefixApi}/${classType.id}`).then(() => setIsReload(!isReload));
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as ClassType;
      
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

  const updateToDB = async (classType: ClassType) => {
    http.patch<ClassType>(`${prefixApi}/${classType.id}`, classType)
  }

  const openModal = (record: ClassType) => {
    setSelectData(record);
    setIsModalOpen(true)
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
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Chi tiết',
      width: '15%',
      dataIndex: 'detail',
      render: (_: any, record: ClassType) => {
        
        return (
          <Typography.Link onClick={() => openModal(record)} style={{ marginInlineEnd: 12 }}>
              Chi tiết
            </Typography.Link>
        )
      },
    },
    {
      title: 'Lịch học',
      width: '15%',
      dataIndex: 'lesson',
      render: (_: any, record: ClassType) => {
        
        return (
          <Typography.Link href={`lesson/${record.id}`} style={{ marginInlineEnd: 12 }}>
              Xem lịch học
            </Typography.Link>
        )
      },
    },
    {
      title: 'Sửa',
      width: '15%',
      dataIndex: 'update',
      render: (_: any, record: ClassType) => {
        
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
      render: (_: any, record: ClassType) => {
        
        return (
          <Popconfirm title="Bạn có muốn xoá?" onConfirm={() => onDelete(record)} okText="Có" cancelText="Không" >
              <a>Xoá</a>
            </Popconfirm>
        )
      },
    },
  ];

  const mergedColumns: TableProps<ClassType>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ClassType) => ({
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
        <ToastContainer />
        <Table<ClassType>
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
        {selectData && <ClassDetail isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={selectData}/>}
      </div>
  );
};

export default CustomTable;