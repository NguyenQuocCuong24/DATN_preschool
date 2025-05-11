"use client";
import http from '@/src/request/httpConfig';
import { LessonResponse } from '@/src/request/reponseType';
import { getStartOfWeek } from '@/src/utils/datetime';
import { Scheduler } from '@aldabil/react-scheduler';
import { vi } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CustomEditor from './customEditor';

interface Event {
  event_id: number;
  title: string;
  start: Date;
  end: Date;
}

const prefixApi = "/lessons";

const TimeTable = () => {
  const params = useParams();
  const classId = params.id;
  const [reload, setReload] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(getStartOfWeek())

  const getEvents = async () => {
    const toDate = new Date();
    toDate.setDate(selectedDate.getDate() + 7)
    var response = await http.get<LessonResponse>(`${prefixApi}?classId=${classId}&fromDate=${selectedDate}&toDate=${toDate}`);
    const data = response.payload.data;
    const result = data.map((item) => ({
      event_id: item.id,
      title: item.description,
      start: new Date(item.startTime),
      end: new Date(item.endTime),
    }));
    setEvents(result);
  };

  useEffect(() => {
    getEvents();
  }, [selectedDate, reload])

  const handleSelectDate = async (date: Date) => {
    const fromDate = new Date(date);
    fromDate.setDate(date.getDate() - 7)
    setSelectedDate(fromDate);
  };

  const handleDelete = async (deleteId: string | number) => {
    var response = await http.delete<LessonResponse>(`${prefixApi}/${deleteId}`);
    if(response.status == 200){
      setReload(!reload);
    }
    return deleteId;
  }

  return (
      <Scheduler
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
              navigation: true
            }}
          onSelectedDateChange={(date) => handleSelectDate(date)}
          events={events}
          customEditor={(scheduler) => <CustomEditor scheduler={scheduler} classId={classId}/>}
          onDelete={(deleteId) => handleDelete(deleteId)}
        />
    );
};

export default TimeTable;