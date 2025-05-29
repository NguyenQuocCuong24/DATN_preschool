"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import Link from "next/link";
import CreateButton from "@/src/components/button/createButton";
import Loading from "@/src/components/loading";
import http from "@/src/request/httpConfig";
import { getCustomerId, isCustomer } from "@/src/utils/userInfo";
import { Schedule, ShuttleSchedule } from "../../request/model";
import { ScheduleResponse, ShuttleScheduleResponse } from "../../request/reponseType";
import CustomTable from "./Table";
import FilterBox from "./filterBox";

export default function ShuttleScheduleContent() {
  const searchParams = useSearchParams();
  const paramId = Number(searchParams.get('scheduleId'));
  
  const [shuttleSchedule, setShuttleSchedule] = useState<ShuttleSchedule[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [scheduleId, setScheduleId] = useState<number>(paramId);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllShuttleSchedules();
  }, [isReload, scheduleId]);

  useEffect(() => {
    getAllSchedules();
  }, []);

  const getAllShuttleSchedules = async () => {
    let params = '';
    if (isCustomer()) {
      params = `&customerId=` + getCustomerId();
    }
    const response = await http.get<ShuttleScheduleResponse>(`/shuttle-schedules?scheduleId=${scheduleId}` + params);
    if (response.status === 200) {
      setShuttleSchedule(response.payload.data);
      setLoading(false);
    }
  }

  const getAllSchedules = async () => {
    const response = await http.get<ScheduleResponse>("/schedules");
    if (response.status === 200) {
      setSchedules(response.payload.data);
      setScheduleId(paramId > 0 ? paramId : response.payload.data.at(-1)?.id ?? 0);
    }
  }

  return loading ? <Loading /> : (
    <div className="flex-1 px-24 py-4 overflow-y-auto">
      <div className="text-large-bold">Danh sách học sinh đăng ký đi xe</div>
      <div className="flex justify-between pt-4">
        <div className="flex">
          <div className="pr-4 pt-1">Chọn lịch trình: </div>
          {schedules && scheduleId && (
            <FilterBox schedules={schedules} scheduleId={scheduleId} setScheduleId={setScheduleId} />
          )}
        </div>
        <Link href={`/schedule/signup/${scheduleId}`}>
          <CreateButton onClick={() => { }} />
        </Link>
      </div>
      <div className="pt-8">
        {shuttleSchedule && scheduleId && (
          <CustomTable
            loading={loading}
            isReload={isReload}
            setIsReload={setIsReload}
            originData={shuttleSchedule}
            schedules={schedules}
            scheduleId={scheduleId}
          />
        )}
      </div>
    </div>
  );
}
