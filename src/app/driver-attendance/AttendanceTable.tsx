"use client"

import http from "@/src/request/httpConfig";
import { AttendanceDriver, ShuttleSchedule } from "@/src/request/model";
import { AttendanceDriverResponse, ShuttleScheduleResponse } from "@/src/request/reponseType";
import { ATTENDANCE_STATUS } from "@/src/utils/config";
import { getEndOfMonth, getStartOfMonth } from "@/src/utils/datetime";
import { isAdmin, isCustomer, isTeacher } from "@/src/utils/userInfo";
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Dayjs } from 'dayjs';
import { Save } from "lucide-react";
import { useEffect, useState } from "react";

type AttendanceStatus = 'PICKED_UP' | 'DROPPED_OFF' | 'ABSENT';

type AttendanceProps = {
  scheduleId: number;
  currentDate: Dayjs;
  search: string;
};

const AttendanceTable = (props: AttendanceProps) => {
  const {scheduleId, currentDate, search} = props;
  const [studentsData, setStudentsData] = useState<ShuttleSchedule[]>([]);
  const [isAttendanced, setIsAttendanced] = useState<boolean>(false)
  const [loadings, setLoadings] = useState<boolean>(false);
  
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
  useEffect(() => {
    getAllStudents();
  }, [scheduleId])

  useEffect(() => {
    getAllAttendances();
  }, [scheduleId, currentDate])

  const getAllStudents = async () => {
    const response = await http.get<ShuttleScheduleResponse>(`/shuttle-schedules?scheduleId=${scheduleId}&fromDate=${getStartOfMonth(currentDate)}&toDate=${getEndOfMonth(currentDate)}`);
    if(response.status === 200){
      setStudentsData(response.payload.data);
    }
  }

  const getAllAttendances = async () => {
    const response = await http.get<AttendanceDriverResponse>(`/attendance-drivers?scheduleId=${scheduleId}&fromDate=${currentDate.format("YYYY-MM-DD")}&toDate=${currentDate.format("YYYY-MM-DD")}`);
    if(response.status === 200){
      const data = response.payload.data;
      if(data.length > 0){
        const dataMap: Record<number, AttendanceStatus> = data.reduce((map, item) => {
          map[item.customerId] = item.status as AttendanceStatus;
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
    if (isCustomer()) {
      return;
    }
    setAttendance((prev) => ({
      ...prev,
      [id]: status, 
    }));
  };

  const pickupList = Object.keys(attendance)
    .filter((id) => attendance[Number(id)] === ATTENDANCE_STATUS.PICKED_UP)
    .map(Number);
  
  const dropOffList = Object.keys(attendance)
    .filter((id) => attendance[Number(id)] === ATTENDANCE_STATUS.DROPPED_OFF)
    .map(Number);

  const absentList = Object.keys(attendance)
    .filter((id) => attendance[Number(id)] === ATTENDANCE_STATUS.ABSENT)
    .map(Number);

  const handleAttendance = async () => {
    setLoadings(true)
    const body = {
      scheduleId: scheduleId,
      startTime: currentDate.format("YYYY-MM-DD"),
      pickUpList: pickupList,
      dropOffList: dropOffList,
      absentList: absentList
    }
    await http.post<AttendanceDriver>("/attendance-drivers", body)
      .then(() => {
        setIsAttendanced(true);
        setLoadings(false);
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const columns: ColumnsType<ShuttleSchedule> = [
      {
        title: 'STT',
        dataIndex: 'stt',
        key: 'row',
        width: '5%',
        render: (_: any, __: any, index: number) => index + 1,
      },
      {
        title: "Họ tên",
        dataIndex: "customerName",
        key: "customerName",
        render: (_, record) => (
          <div className="font-medium">
            {record.customerName}
          </div>
        ),
      },
      {
        title: "Lớp học",
        dataIndex: "className",
        key: "className",
        render: (_, record) => (
          <div className="font-medium">
            {record.className}
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
              type={attendance[record.id] === ATTENDANCE_STATUS.PICKED_UP ? "primary" : "default"}
              className={
                attendance[record.id] === ATTENDANCE_STATUS.PICKED_UP ? "bg-green-500 border-green-500" : ""
              }
              icon={<CheckCircleOutlined />}
              onClick={() => handleMark(record.id, ATTENDANCE_STATUS.PICKED_UP)}
            >
              Đã đón
            </Button>
            <Button
              type={attendance[record.id] === ATTENDANCE_STATUS.DROPPED_OFF ? "primary" : "default"}
              className={
                attendance[record.id] === ATTENDANCE_STATUS.DROPPED_OFF ? "bg-green-500 border-green-500" : ""
              }
              icon={<CheckCircleOutlined />}
              onClick={() => handleMark(record.id, ATTENDANCE_STATUS.DROPPED_OFF)}
            >
              Đã trả
            </Button>
            <Button
              type={attendance[record.id] === ATTENDANCE_STATUS.ABSENT ? "primary" : "default"}
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleMark(record.id, ATTENDANCE_STATUS.ABSENT)}
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
          {(isAdmin() || isTeacher()) && <Button type="primary" className="bg-button-primary" icon={<Save />}
            loading={loadings && { icon: <SyncOutlined spin /> }}
            size={'large'} onClick={handleAttendance}>
            {isAttendanced ? "Sửa điểm danh" : "Lưu điểm danh"}
          </Button>}
        </div>
        <Table
          dataSource={studentsData.filter((item) =>
            item.customerName.toLowerCase().includes(search.toLowerCase())
          )}
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
