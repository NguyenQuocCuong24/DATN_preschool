export type ClassType = {
    id: number;
    name: string;
    totalStudent: number;
    teachers: ClassTeacher[]

  };

export type Customer = {
  id: number;
  fullName: string;
  avatarUrl: string;
  mobile: string;
  status: string;
  customerType: string;
  userId: number;
  classId: number;
  createdAt: string;
  email: string;
  description: string;
  birthDate: string;
  address: string;
};

export type Lesson = {
  id: number;
  description: string;
  classId: number;
  startTime: string;
  endTime: string;
};

export type Attendance = {
  id: number;
  lessonId: number;
  classId: number;
  startTime: string;
  endTime: string;
  customerId: number;
  present: boolean;
};

export type ClassTeacher = {
  id: number;
  classId: number;
  className: string;
  customerId: number;
  customerName: string;
};

export type Schedule = {
  id: number;
  name: string;
  routes: string[];
};

export type ShuttleSchedule = {
  id: number;
  customerId: number;
  scheduleId: number;
  pickUpAddress: string;
  dropOffAddress: string;
  startTime: string;
};

export type Menu = {
  id: number;
  name: string;
  foods: string[];
  startTime: string;
  type: string;
  image: string;
};