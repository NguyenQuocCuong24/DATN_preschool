import { ClassType, Customer, Lesson } from "./model";

export type CustomerResponse = {
    data: Array<Customer>;
    pagination: Object
  };

export type ClassResponse = {
    data: Array<ClassType>;
    pagination: Object
};

export type LessonResponse = {
  data: Array<Lesson>;
  pagination: Object
};
