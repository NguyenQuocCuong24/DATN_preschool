export const MEAL_TYPE: { [key: string]: string } = {
  LUNCH: "Bữa trưa",
  DINNER: "Bữa chiều"
}

export enum ATTENDANCE_STATUS {
    PICKED_UP = "PICKED_UP",
    DROPPED_OFF = "DROPPED_OFF",
    ABSENT = "ABSENT"
}

export enum CUSTOMER_TYPE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  TEACHER = "TEACHER"
}

export const ROLE_MAP: { [key: string]: string } = {
    TEACHER: 'Giáo viên',
    CUSTOMER: 'Học sinh',
    ADMIN: 'Quản trị viên'
  };