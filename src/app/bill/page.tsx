"use client"
import Loading from "@/src/components/loading";
import LeftMenu from "@/src/components/sidebar/leftMenu";
import http from "@/src/request/httpConfig";
import { Bill, ClassType } from "@/src/request/model";
import { ClassResponse } from "@/src/request/reponseType";
import { getEndOfMonth, getStartOfMonth } from "@/src/utils/datetime";
import { Button, Card, ConfigProvider, DatePicker, Input, Popconfirm, Table, Tag } from "antd";
import viVN from 'antd/es/locale/vi_VN';
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { CheckCircle, Mail, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import FilterBox from "../student/filterBox";
import { isAdmin } from "@/src/utils/userInfo";


const StudentInvoiceManager: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true)
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())

  const onDateChange = (value: Dayjs) => {
    setCurrentDate(value);
  }

  const [classes, setClasses] = useState<ClassType[]>([]);
  const [classId, setClassId] = useState<number>();

  const [bills, setBills] = useState<Bill[]>([]);


  useEffect(() => {
    getAllClasses();
  }, [])

  useEffect(() => {
    getBills();
  }, [classId, currentDate])

  const getAllClasses = async () => {
    const response = await http.get<ClassResponse>("/classes");
    if (response.status === 200) {
      setClasses(response.payload.data);
      setClassId(response.payload.data[response.payload.data.length - 1].id);
      setLoading(false)
    }
  }

  const getBills = async () => {
    const response = await http.get(`/bills?classId=${classId}&fromDate=${getStartOfMonth(currentDate)}&toDate=${getEndOfMonth(currentDate)}`);
    if (response.status === 200) {
      setBills(response?.payload as Bill[]);
    }
  }

  const confirm = async (record: Bill) => {
    await http.post<Bill>("/bills", { ...record, status: "PAID" })
      .then(() => {
        getBills();
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const cancel = () => {
  };

  const sendEmail = async (record: Bill) => {
    await http.post("/send-emails", record).then(() => {
      getBills();
    });
  };

  const columns: ColumnsType<Bill> = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'row',
      width: '5%',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Học sinh",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Học phí",
      dataIndex: "tuition",
      key: "tuition",
      render: (_, record) => (
        <span>{(record.detail['tuition'] ?? 0).toLocaleString("vi-VN") + " ₫"}</span>
      )
    },
    {
      title: "Tiền ăn",
      dataIndex: "eatFees",
      key: "eatFees",
      render: (_, record) => (
        <span>{(record.detail['eatFees'] ?? 0).toLocaleString("vi-VN") + " ₫"}</span>
      )
    },
    {
      title: "Tiền xe",
      dataIndex: "travelFees",
      key: "travelFees",
      render: (_, record) => (
        <span>{(record.detail['travelFees'] ?? 0).toLocaleString("vi-VN") + " ₫"}</span>
      )
    },
    {
      title: "Tổng",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value: number) => (
        <strong>{value.toLocaleString("vi-VN")} ₫</strong>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "PAID" ? (
          <Tag color="green">Đã thu</Tag>
        ) : (
          <Tag color="red">Chưa thu</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Bill) => {
        if (!isAdmin()) {
          return <></>
        }
        return (
          (
            <div className="flex gap-2">
              <Button icon={<Mail size={16} />} size="small" onClick={() => sendEmail(record)}>
                {record.isSent ? "Gửi lại email" : "Gửi email"}
              </Button>
              {record.status === "UNPAID" && (
                <Popconfirm
                  title="Bạn có chắc chắn đánh đấu là đã thu?"
                  description="Thao tác này không thể hoàn tác."
                  onConfirm={() => confirm(record)}
                  onCancel={cancel}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button icon={<CheckCircle size={16} />} size="small" type="primary">
                    Đánh dấu đã thu
                  </Button>
                </Popconfirm>

              )}
            </div>
          )
        )
      },
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftMenu />
      {loading ? <Loading /> : <div className="flex-1 px-12 py-4 overflow-y-auto">
        <div className='w-full bg-white rounded p-4'>
          <p className='text-normal-bold'>Quản lý hoá đơn</p>
          <div className="flex pt-4">
            <div className='w-1/4'>
              <p>Lớp</p>
              {classes && classId && <FilterBox classes={classes} classId={classId} setClassId={setClassId} />}
            </div>

            <div>
              <p>Tháng thanh toán</p>
              <ConfigProvider locale={viVN}>
                <DatePicker className='w-full' picker="month" format={"MM-YYYY"} defaultValue={dayjs()} onChange={onDateChange} />
              </ConfigProvider>
            </div>

            <div className="ml-24 items-center gap-4 mb-4">
              <p>Tìm kiếm</p>
              <div className="flex gap-2">
                <Input
                  prefix={<Search size={16} />}
                  placeholder="Tìm học sinh..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Card className="rounded-2xl shadow-md p-4">
            {bills && <Table
              dataSource={bills.filter((item) =>
                item.customerName.toLowerCase().includes(search.toLowerCase())
              )}
              columns={columns}
            />}
          </Card>
        </div>
      </div>
      }
    </div>
  );
};

export default StudentInvoiceManager;
