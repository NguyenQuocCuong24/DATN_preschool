import { Attendance, ClassType, Customer, Lesson, Menu, Schedules, ShuttleSchedule } from "./model";

export type CustomerResponse = {
    data: Array<Customer>;
    pagination: Object
  };

export type CustomerDetailResponse = Customer;

export type ClassResponse = {
    data: Array<ClassType>;
    pagination: Object
};

export type LessonResponse = {
  data: Array<Lesson>;
  pagination: Object
};

export type AttendanceResponse = {
  data: Array<Attendance>;
  pagination: Object
};

export type ScheduleResponse = {
  data: Array<Schedules>;
  pagination: Object
};

export type ShuttleScheduleResponse = {
  data: Array<ShuttleSchedule>;
  pagination: Object
};

export type MenuResponse = {
  data: Array<Menu>;
  pagination: Object
};
