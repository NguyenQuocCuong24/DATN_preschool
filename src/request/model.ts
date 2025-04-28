export type ClassType = {
    id: number;
    name: string;
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
};

export type Lesson = {
  id: number;
  description: string;
  classId: number;
  startTime: Date;
  endTime: Date;
};