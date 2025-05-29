"use client"
import http from '@/src/request/httpConfig';
import { ClassTeacher, ClassType, Customer } from '@/src/request/model';
import { Form, Popconfirm, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import ModalForm from './ModalForm';
import { isAdmin } from '@/src/utils/userInfo';

const prefixApi = '/classes';

type TeacherTableProps = {
  originData: ClassType[];
  isReload: boolean;
  setIsReload: (isReload: boolean) => void; 
  teachers: Customer[];
};

const CustomTable = (props: TeacherTableProps) => {
  const {originData, isReload, setIsReload, teachers} = props;
  const [form] = Form.useForm();
  const [data, setData] = useState<ClassType[]>(originData);
  const [teacherIds, setTeacherIds] = useState<number[]>();
  const [classId, setClassId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(originData);
  }, [originData])
  

  const onDelete = (classType: ClassType) => {
    http.delete(`${prefixApi}/${classType.id}`).then(() => setIsReload(!isReload));
  }
  const updateToDB = async (classType: ClassType) => {
    http.patch<ClassType>(`${prefixApi}/${classType.id}`, classType)
  }

  const handleUpdate = (record: Partial<ClassType>) => {
    const ids = record.teachers?.map(e => e.customerId);
    setTeacherIds(ids)
    setClassId(record.id || 0);
    form.setFieldsValue({...record, teacherIdList: ids});
    setIsModalOpen(true)
  }

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        updateToDB({...values, id: classId}).then(async () => {
          const originSet = new Set(teacherIds);
          const newSet = new Set(values.teacherIdList);
          
          const removeList = teacherIds!.filter(x => !newSet.has(x)); // A - B
          const addList = values.teacherIdList.filter((x:number) => !originSet.has(x));
          const createPromise = addList.map((customerId: number) => createClassTeacher(classId, customerId));
          const deletePromise = removeList.map((customerId: number) => deleteClassTeacher(classId, customerId));
          await Promise.all(createPromise);
          await Promise.all(deletePromise);
          setIsReload(!isReload);
          setClassId(0);
          setTeacherIds([]);
          form.resetFields();
        });
        setIsModalOpen(false);
    })
    .catch(info => {
    console.log("Validate Failed:", info);
    });
  };

  async function createClassTeacher(classId: number, customerId: number): Promise<ClassTeacher> {
    const response = await http.post<ClassTeacher>("/class-teachers", {classId: classId, customerId: customerId});
    return response.payload;
  }

  async function deleteClassTeacher(classId: number, customerId: number): Promise<ClassTeacher> {
    const response = await http.delete<ClassTeacher>("/class-teachers", {classId: classId, customerId: customerId});
    return response.payload;
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
    },
    {
      title: 'Số học sinh',
      dataIndex: 'totalStudent',
      key: 'totalStudent',
    },
    {
      title: 'Giáo viên',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (_: any, record: ClassType) => {
        const teacherName = record.teachers.filter(e => e.customerName != null).map(item => item.customerName).join(", ");
        return (
          <div>{teacherName}</div>
        )
      },
    },
    {
      title: 'Hành động',
      width: '25%',
      dataIndex: 'delete',
      render: (_: any, record: ClassType) => {
        if (isAdmin()) {
          
          return (
            <div className='flex justify-between'>
            <Typography.Link href={`lesson/${record.id}`}>
              Xem lịch học
            </Typography.Link>
                <div>|</div>
                <Typography.Link onClick={() => handleUpdate(record)}>
                  Sửa
                </Typography.Link>
                <div>|</div>
                <Popconfirm title="Bạn có muốn xoá?" onConfirm={() => onDelete(record)} okText="Có" cancelText="Không" >
                  <a>Xoá</a>
                </Popconfirm>
          </div>
        )
      }
      return (
        <Typography.Link href={`lesson/${record.id}`}>
          Xem lịch học
        </Typography.Link>
      )
      },
    },
  ];

  return (
    <div>
      <Form form={form} component={false}>
        <Table<ClassType>
          bordered
          dataSource={data}
          columns={columns}
          />
        </Form>
        {teachers && <ModalForm title={"Sửa lớp học"} confirmText={"Sửa"} handleOk={handleOk}
               isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} form={form} teachers={teachers}/>}
      </div>
  );
};

export default CustomTable;