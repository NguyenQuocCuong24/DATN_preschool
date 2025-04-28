import { toast } from 'react-toastify';

type ErrorCodeMap = {
  [key: string]: string;
};


export const handleErrorCode = (error: any) => {
  const errorMessage = error?.code || error?.message || "Có lỗi xảy ra";
  toast.error(errorMessage)
};

export const handleSuccess = () => {
  console.log("22222: ");
  toast.success("Thành công!")
};

