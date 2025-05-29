"use client"
import Loading from "@/src/components/loading";
import LeftMenu from "@/src/components/sidebar/leftMenu";
import http from "@/src/request/httpConfig";
import { Menu } from "@/src/request/model";
import { MenuResponse } from "@/src/request/reponseType";
import { getStartOfWeek } from "@/src/utils/datetime";
import { Button, Card, Form, Input, Modal } from "antd";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import WeekPicker from "./WeekPicker";
import Link from "next/link";
import { isAdmin } from "@/src/utils/userInfo";

export type MealType = "LUNCH" | "DINNER";

const MEAL_TYPE = {
  LUNCH: "Bữa trưa",
  DINNER: "Bữa chiều"
}

export type DayMeal = {
  [key in MealType]: string[];
};

type CustomTitleProps = {
  day: string;
  index: number;
};

export interface MealPlan {
  day: string;
  meals: DayMeal;
  date: Date
}

const mealTypes: MealType[] = ["LUNCH", "DINNER"];

function getWeekdaysThisWeek(today: Date): Date[] {
  const day = today.getDay(); 

  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

  const weekdays: Date[] = [];
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    weekdays.push(d);
  }

  return weekdays;
}

function getWeekdayString(date: Date): string {
  return date.toLocaleDateString('vi-VN', { weekday: 'long' });
}

const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

export default function MealPlanManager() {
  const [weekdays, setWeekdays] = useState<Date[]>(getWeekdaysThisWeek(new Date));
  const [selectDate, setSelectDate] = useState<Date>(getStartOfWeek(new Date()))
  const [idUpdate, setIsUpdate] = useState<boolean>(false);
  const [meals, setMeals] = useState<MealPlan[]>(() => {
    return weekdays.map((day: Date) => ({
      day: getWeekdayString(day),
      date: day,
      meals: mealTypes.reduce((acc, meal) => {
        acc[meal] = [];
        return acc;
      }, {} as DayMeal)
    }));
  });

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<MealType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  
  useEffect(() => {
    // setLoading(true)
    setWeekdays(getWeekdaysThisWeek(selectDate));
    setReload(!reload);
  }, [selectDate]);

  useEffect(() => {
    getAllMenus();
  }, [reload])

  const getAllMenus = async () => {
    const toDate = new Date(selectDate);
    toDate.setDate(selectDate.getDate() + 6);
    const response = await http.get<MenuResponse>(`/menus?fromDate=${selectDate.toISOString().split('T')[0]}&toDate=${toDate.toISOString().split('T')[0]}`);
    if(response.status === 200){
      const data = response.payload.data;
      setMeals(() => {
        return weekdays.map((day: Date) => {
          const values = data.filter(e => (new Date(e.startTime)).getDate() == day.getDate()); 
          return({
            day: getWeekdayString(day),
            date: day,
            meals: mealTypes.reduce((acc, meal) => {
              acc[meal] = values.find(e => e.type == meal)?.foods ?? [];
              return acc;
            }, {} as DayMeal)
        })
        })})
    }
    setLoading(false);
  }

  const openModal = (day: string, meal: MealType, index: number) => {
    setSelectedDay(day);
    setSelectedMeal(meal);
    form.setFieldsValue({foods: meals[index].meals[meal].length > 0 ? meals[index].meals[meal] : ['']});
    setIsModalOpen(true);
  };

  const handleAddDish = () => {
    setIsUpdate(true)
    const foods = form.getFieldsValue().foods;
    if (foods.length == 0 || !selectedDay || !selectedMeal) return;
      setMeals(prev => prev.map(d => {
        if (d.day === selectedDay) {
          return {
            ...d,
            meals: {
              ...d.meals,
              [selectedMeal]: [...foods]
            }
          };
        }
        return d;
      }));
    form.resetFields();
    setIsModalOpen(false);
  };

  const onSubmit = async () => {
    const promises = meals.map((meal: MealPlan) => {
      for (const [mealType, dishes] of Object.entries(meal.meals)) {
        if (dishes.length > 0) {
          createMenu(mealType, dishes, meal.date);
        }

      }
    });
    await Promise.all(promises);
  }

  async function createMenu(mealType: string, foods: string[], date: Date): Promise<Menu> {
      const body = {
        type: mealType,
        foods: foods,
        startTime: date.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
      }
      const response = await http.post<Menu>("/menus", body);
      return response.payload;
  }

  const CustomTitle: React.FC<CustomTitleProps> = ({ day, index }) => {
    
    return <div className="flex justify-between">
      <span>{day}</span>
      <Link href={`/menu/detail?date=${meals[index].date.toLocaleDateString('sv-SE', {
          timeZone: 'Asia/Ho_Chi_Minh',
        })}`}>
        <Button>
          Chi tiết
        </Button>
      </Link>
    </div>;
  };


  return (
    <div className="flex h-screen overflow-hidden">
        <LeftMenu />

      <div className="p-6 space-y-6 flex-1 px-24 py-4 overflow-y-auto">
        {loading ? <Loading /> : 
          <div>
            <div className="flex justify-between">
            <div className="">
              <h1 className="text-2xl font-bold pr-8">Quản Lý Thực Đơn Tuần</h1>
              <div className="flex items-center pt-4">
                <p className="pr-8">Tuần</p>
                <WeekPicker setSelectDate={setSelectDate}/>
              </div>
            </div>
            {idUpdate && isAdmin() && <div className="px-4 py-2 bg-button-primary h-10 w-fit rounded text-white font-medium cursor-pointer" onClick={onSubmit}>
                Cập nhật
            </div>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map(({ day, meals }, index) => (
              <Card key={day} title={<CustomTitle day={day} index={index}/>} className="rounded-2xl shadow-md">
                {mealTypes.map(type => (
                  <div key={type} className="mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{MEAL_TYPE[type]}</span>
                      {isAdmin() && <Button size="small" onClick={() => openModal(day, type, index)}>
                        {meals[type].length == 0 ? "+ Thêm món" : "Chỉnh sửa"}
                      </Button>}

                      
                    </div>
                    <ul className="ml-4 list-disc text-sm mt-1">
                      {meals[type].map((dish, idx) => (
                        <li key={idx}>{dish}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Card>
            ))}
          </div>

          <Modal
            title={`Thêm món cho ${selectedMeal} - ${selectedDay}`}
            open={isModalOpen}
            onOk={handleAddDish}
            onCancel={() => setIsModalOpen(false)}
            okText="Thêm"
            cancelText="Huỷ"
          >
            <Form
                  name="dynamic_form_item"
                  {...formItemLayoutWithOutLabel}
                  style={{ maxWidth: 600 }}
                  form={form}
                  >
                      <Form.List
                      name="foods"
                      
                  >
                      {(fields, { add, remove }, { errors }) => (
                      <>
                          {fields.map((field, index) => (
                          <Form.Item
                              {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                              label={index === 0 ? 'Món ăn' : ''}
                              required={false}
                              key={field.key}
                          >
                              <div className='flex gap-2'>
                                  <Form.Item
                                  {...field}
                                  validateTrigger={['onChange', 'onBlur']}
                                  rules={[
                                      {
                                      required: true,
                                      whitespace: true,
                                      message: "Vui lòng nhập đầy đủ món ăn.",
                                      },
                                  ]}
                                  noStyle
                                  >

                                  <Input placeholder="Nhập món ăn" style={{ width: '60%' }} />
                                  </Form.Item>
                                  {fields.length > 1 ? (
                                      <CircleX
                                          color='gray'
                                          className="cursor-pointer dynamic-delete-button"
                                          onClick={() => remove(field.name)}
                                      />
                                  ) : null}
                              </div>
                          </Form.Item>
                          ))}
                          <Form.Item>
                          <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{ width: '60%' }}
                          >
                              Thêm món ăn
                          </Button>
                          
                          <Form.ErrorList errors={errors} />
                          </Form.Item>
                      </>
                      )}
                  </Form.List>

            </Form>
          </Modal>
        </div>
      }
    </div>
    </div>
  );
}
