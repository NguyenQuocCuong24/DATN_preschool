"use client"

import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Attendance, Customer } from "@/src/request/model";
import { AttendanceResponse, CustomerResponse } from "@/src/request/reponseType";
import http from "@/src/request/httpConfig";
import { ColumnsType } from "antd/es/table";
import { Save } from "lucide-react";

type AttendanceStatus = true | false | null;

type AttendanceProps = {
  classId: number;
  lessonId: number;
};

const AttendanceTable = (props: AttendanceProps) => {
  const {classId, lessonId} = props;
  const [studentsData, setStudentsData] = useState<Customer[]>([]);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [isAttendanced, setIsAttendanced] = useState<boolean>(false)
  const [loadings, setLoadings] = useState<boolean>(false);
  
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  useEffect(() => {
    getAllStudents();
  }, [classId])

  useEffect(() => {
    getAllAttendances();
  }, [lessonId])

  const getAllStudents = async () => {
    var response = await http.get<CustomerResponse>(`/customers?customerType=CUSTOMER&classId=${classId}`);
    if(response.status === 200){
      setStudentsData(response.payload.data);
      // setLoading(false);
    }
  }

  const getAllAttendances = async () => {
    var response = await http.get<AttendanceResponse>(`/attendances?lessonId=${lessonId}`);
    if(response.status === 200){
      var data = response.payload.data;
      setAttendanceData(data);
      if(data.length > 0){
        const dataMap: Record<number, AttendanceStatus> = data.reduce((map, item) => {
          map[item.customerId] = item.present;
          return map;
        }, {} as Record<number, AttendanceStatus>);
        setAttendance(dataMap);
        setIsAttendanced(true)
      } else {
        setAttendance({})
        setIsAttendanced(false)
      }
    }
  }
  const handleMark = (id: number, status: AttendanceStatus) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === status ? null : status, 
    }));
  };

  const presentList = Object.keys(attendance)
    .filter((id) => attendance[Number(id)] === true)
    .map(Number);
    

  const absentList = Object.keys(attendance)
    .filter((id) => attendance[Number(id)] === false)
    .map(Number);

  const handleAttendance = async () => {
    setLoadings(true)
    var body = {
      lessonId: lessonId,
      "presentList": presentList,
      "absentList": absentList
    }
    await http.post<Attendance>("/attendances", body)
      .then(() => {
        setIsAttendanced(true);
        setLoadings(false);
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
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
        render: (_, record) => (
          <div className="font-medium">
            {record.fullName}
          </div>
        ),
      },
      {
        title: "Số điện thoại",
        dataIndex: "mobile",
        key: "mobile",
        render: (_, record) => (
          <div className="font-medium">
            {record.mobile}
          </div>
        ),
      },
      {
        title: "Điểm danh",
        key: "attendance",
        width: '25%',
        align: 'right',
        render: (_, record) => (
          <div className="flex justify-end space-x-2">
            <Button
              type={attendance[record.id] === true ? "primary" : "default"}
              className={
                attendance[record.id] === false ? "bg-green-500 border-green-500" : ""
              }
              icon={<CheckCircleOutlined />}
              onClick={() => handleMark(record.id, true)}
            >
              Có mặt
            </Button>
            <Button
              type={attendance[record.id] === false ? "primary" : "default"}
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleMark(record.id, false)}
            >
              Vắng
            </Button>
          </div>
        ),
      },
    ];
  return (
    <div className="w-full mx-auto">
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex justify-between pb-4">
          <h2 className="text-xl font-semibold mb-4">Danh sách học sinh</h2>
          <Button type="primary" className="bg-button-primary" icon={<Save />}
            loading={loadings && { icon: <SyncOutlined spin /> }}
            size={'large'} onClick={handleAttendance}>
            {isAttendanced ? "Sửa điểm danh" : "Lưu điểm danh"}
          </Button>
        </div>
        <Table
          dataSource={studentsData}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
      />
      </div>
    </div>
  );
};

export default AttendanceTable;
