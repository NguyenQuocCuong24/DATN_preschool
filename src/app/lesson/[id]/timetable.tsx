"use client";
import http from '@/src/request/httpConfig';
import { LessonResponse } from '@/src/request/reponseType';
import { Scheduler } from '@aldabil/react-scheduler';
import { RemoteQuery } from '@aldabil/react-scheduler/types';
import { vi } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import CustomEditor from './customEditor';

const prefixApi = "/lessons";

const TimeTable = () => {
  const params = useParams();
  const classId = params.id;
  const [reloadKey, setReloadKey] = useState(0);
    const getEvents = async (params: RemoteQuery) => {
      const fromDate = params.start;
      const toDate = params.end;
      var response = await http.get<LessonResponse>(`${prefixApi}?classId=${classId}&fromDate=${fromDate}&toDate=${toDate}`);
      const data = response.payload.data;
      return data.map((item) => ({
        event_id: item.id,
        title: item.description,
        start: new Date(item.startTime),
        end: new Date(item.endTime),
      }));
    };

  const handleDelete = async (deleteId: string | number) => {
    var response = await http.delete<LessonResponse>(`${prefixApi}/${deleteId}`);
    if(response.status == 200){
      setReloadKey((prev) => prev + 1);
    }
    return deleteId;
  }

  return (
      <Scheduler
          key={reloadKey}
          view="week"
          locale={vi}
          hourFormat={"24"}
          agenda={false}
          
          week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 1,
              startHour: 7,
              endHour: 17,
              step: 60,
            }}
            
          getRemoteEvents={getEvents}
          customEditor={(scheduler) => <CustomEditor scheduler={scheduler} classId={classId}/>}
          onDelete={async (deleteId) => handleDelete(deleteId)}
        />
    );
};

export default TimeTable;