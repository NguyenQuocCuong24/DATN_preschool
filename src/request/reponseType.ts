import { Attendance, AttendanceDriver, ClassType, Customer, Lesson, Menu, Schedule, ShuttleSchedule } from "./model";

export type CustomerResponse = {
    data: Array<Customer>;
    pagination: object
  };

export type CustomerDetailResponse = Customer;

export type ClassResponse = {
    data: Array<ClassType>;
    pagination: object
};

export type LessonResponse = {
  data: Array<Lesson>;
  pagination: object
};

export type AttendanceResponse = {
  data: Array<Attendance>;
  pagination: object
};

export type ScheduleResponse = {
  data: Array<Schedule>;
  pagination: object
};

export type ShuttleScheduleResponse = {
  data: Array<ShuttleSchedule>;
  pagination: object
};

export type MenuResponse = {
  data: Array<Menu>;
  pagination: object
};

export type AttendanceDriverResponse = {
  data: Array<AttendanceDriver>;
  pagination: object
};

