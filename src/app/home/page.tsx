"use client"
import { CalendarOutlined } from '@ant-design/icons';
import type { CalendarProps } from 'antd';
import { Calendar, Card, ConfigProvider, Select, Statistic, theme } from 'antd';
import viVN from "antd/locale/vi_VN";
import { Dayjs } from 'dayjs';
import { ClipboardList, Table2, Users, Users2 } from "lucide-react";
import React, { useEffect, useState } from 'react';

import dayjs from "dayjs";
import "dayjs/locale/vi";
import { Menu } from '@/src/request/model';
import http from '@/src/request/httpConfig';
import { MenuResponse } from '@/src/request/reponseType';
import LeftMenu from '@/src/components/sidebar/leftMenu';
import Loading from '@/src/components/loading';
import { MEAL_TYPE } from '@/src/utils/config';
dayjs.locale("vi");

type OverViewData = {
  totalStudent: number;
  totalClass: number;
  totalTeacher: number;
  attendanceRatio: number;
}

export default function Home() {
  const [data, setData] = useState<OverViewData>();
  const [currentDate, setCurrentDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [loading, setLoading] = useState<boolean>(true)
  const [menu, setMenu] = useState<Menu[]>([]);

  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  useEffect(() => {
    getOverviewData();
  }, [])

  useEffect(() => {
    getAllMenus();
  }, [currentDate]);

  const getOverviewData = async () => {
      const response = await http.get("/overviews");
      if(response.status === 200){
          setData(response?.payload as OverViewData);
          setLoading(false);
      }
  }

  const getAllMenus = async () => {
    const response = await http.get<MenuResponse>(`/menus?fromDate=${currentDate}&toDate=${currentDate}`);
    if(response.status === 200){
      const data = response.payload.data;
      setMenu(data);
    }
  }

  const onDateChange = (value: Dayjs) => {
    setCurrentDate(value.format('YYYY-MM-DD'));
  }

  const onPanelChange = (value: Dayjs) => {
    setCurrentDate(value.format('YYYY-MM-DD'));
  };

  const months = Array.from({ length: 12 }, (_, i) => i);

  const headerRender: CalendarProps<Dayjs>["headerRender"] = ({
    value,
    onChange,
  }) => {
    const current = value.clone();

    const onMonthChange = (newMonth: number) => {
      const newValue = current.month(newMonth);
      onChange?.(newValue);
    };

    const onYearChange = (newYear: number) => {
      const newValue = current.year(newYear);
      onChange?.(newValue);
    };

    const years = Array.from({ length: 10 }, (_, i) => current.year() - 5 + i);

    return (
      <div className="flex gap-2 items-center mb-2 pt-4 pl-4">
        <div className="flex gap-2">
          <Select
            value={current.month()}
            onChange={onMonthChange}
            size="small"
          >
            {months.map((month) => (
              <Select.Option key={month} value={month}>
                {dayjs().month(month).format("MMMM")}
              </Select.Option>
            ))}
          </Select>
          <Select
            value={current.year()}
            onChange={onYearChange}
            size="small"
          >
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftMenu />
      <div className="flex-1 px-24 py-4 overflow-y-auto">
        {loading || !data ? <Loading /> : 
        <div className="p-4">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-2xl shadow-md">
                <Statistic title="Tổng số học sinh" value={data.totalStudent} prefix={<Users className="relative top-0.75 text-[20px]" />} />
            </Card>

            <Card className="rounded-2xl shadow-md">
                <Statistic title="Tổng số giáo viên" value={data.totalTeacher} prefix={<Users2 className="relative top-0.75 text-[20px]"/>} />
            </Card>

            <Card className="rounded-2xl shadow-md">
                <Statistic title="Tổng số lớp học" value={data.totalClass} prefix={<Table2 className="relative top-0.75 text-[20px]"/>} />
            </Card>
            <Card className="rounded-2xl shadow-md">
                <Statistic title="Tỉ lệ điểm danh" precision={2} value={data.attendanceRatio} prefix={<ClipboardList className="relative top-0.75 text-[20px]"/>} />
            </Card>
          </div>

            <div className="grid grid-cols-12 gap-6 mt-4">
              <div className="col-span-8">
                <Card className="col-span-full rounded-2xl shadow-md">
                  <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <CalendarOutlined /> Thực đơn hôm nay
                  </h2>
                  <ul className="list-disc pl-6 space-y-1">
                    {menu.length > 0 ? menu.map((value, index) => {
                      return(
                        <li key={index}>{MEAL_TYPE[value.type]}: {value.foods.join(", ")}</li>
                      )
                    }) : <li>Hôm nay chưa có thực đơn</li>}
                  </ul>
                </Card>
              </div>
              <div className="col-span-4">
                <div style={wrapperStyle}>
                  <ConfigProvider locale={viVN}>
                    <Calendar
                    headerRender={headerRender}
                    fullscreen={false} onPanelChange={onPanelChange} onChange={onDateChange} /> 
                  </ConfigProvider>
                </div>
              </div>
            </div>

        </div>

          }
      </div>
    </div>
  );
}

