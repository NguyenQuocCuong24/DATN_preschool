import { TimePicker, Input, Button } from "antd";
import dayjs from "dayjs";
import { SchedulerHelpers } from "@aldabil/react-scheduler/types";
import { useState } from "react";
import http from "@/src/request/httpConfig";
import { Lesson } from "@/src/request/model";
import { ParamValue } from "next/dist/server/request/params";

const CustomEditor = ({ scheduler, classId }: { scheduler: SchedulerHelpers, classId: ParamValue }) => {
  
  var startTime = scheduler.state.start.value;
  const [title, setTitle] = useState(scheduler.edited?.title || "");
  const [endTime, setEndTime] = useState(
    dayjs(startTime as Date).add(1, "hour")
  );

  const handleSubmit = async () => {
    if (endTime.isBefore(startTime)) return alert("Giờ kết thúc phải sau giờ bắt đầu");
    const body = {
      startTime: startTime,
      endTime: endTime.toDate(), 
      classId: classId, 
      description: title
    }
    if(scheduler.edited){
      http.patch<Lesson>(`/lessons/${scheduler.edited.event_id}`, body).then((record) => {
        scheduler.onConfirm({
          event_id: record.payload.id,
          title,
          start: startTime,
          end: endTime.toDate(),
        }, "edit");
        scheduler.close()
      });
    } else {
      http.post<Lesson>("/lessons", body).then((record) => {
        scheduler.onConfirm({
          event_id: record.payload.id,
          title,
          start: startTime,
          end: endTime.toDate(),
        }, "create");
        scheduler.close()
      });
      
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-[300px]">
      <label className="text-sm font-medium">Nhập mô tả(nếu có)</label>
      <Input onChange={(e) => setTitle(e.target.value)} />

      <label className="text-sm font-medium">Giờ bắt đầu</label>
      <TimePicker
        disabled={true}
        format="HH:mm"
        value={dayjs(startTime as Date)}
        popupClassName="!z-[9999]"

      />
      <label className="text-sm font-medium">Giờ kết thúc</label>
      <TimePicker
        format="HH:mm"
        value={endTime}
        onChange={(val) => val && setEndTime(val)}
        showNow={false}
        showSecond={false}
        use12Hours={false}
        allowClear={false}
        showHour
        showMinute
        popupClassName="!z-[9999]"

      />

      <Button type="primary" onClick={handleSubmit} className="mt-4">
        {scheduler.edited ? "Cập nhật" : "Tạo"}
      </Button>
    </div>
  );
};

export default CustomEditor;
