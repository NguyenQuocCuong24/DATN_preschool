import dayjs, { Dayjs } from 'dayjs';
export const convertToDateTime = (text: string) => {
    return new Date(text).toLocaleString("vi-VN");
}

export const convertToDate = (text: string) => {
    if(text == null) return new Date().toLocaleDateString("vi-VN");
    return new Date(text).toLocaleDateString("vi-VN");
}

export const convertToMonth = (text: string) => {
    if(text == null) return "";
    return dayjs(text).format('MM/YYYY');
}

export const convertToTime = (text: string) => {
    return new Date(text).toLocaleTimeString("vi-VN", {
        hour: '2-digit',
        minute: '2-digit'
      });
}

export const convertToDayjs = (text?: string) => {
    if(text == null) return null;
    const date = new Date(text);
    return dayjs(date);
}

export function getStartOfWeek(date = new Date()) {
    const day = date.getDay(); 
    const diff = (day === 0 ? -6 : 1) - day + 1; 
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    start.setHours(0, 0, 0, 0); 
    return start;
  }

export function getStartOfMonth(date: Dayjs){
    return  date.startOf('month').format('YYYY-MM-DD');
}
export function getEndOfMonth(date: Dayjs){
    return  date.endOf('month').format('YYYY-MM-DD');
}