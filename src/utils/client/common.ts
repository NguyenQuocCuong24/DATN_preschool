import { toast } from 'react-toastify';

type ErrorCodeMap = {
  [key: string]: string;
};


export const handleErrorCode = (error: any) => {
  const errorMessage = error?.code || error?.message || error?.error || "Có lỗi xảy ra";
  toast.error(errorMessage)
};
const TOAST_ID = "global-toast";
export const handleSuccess = () => {
  if(!toast.isActive(TOAST_ID)){
    toast.success("Thành công!", { toastId: TOAST_ID })
  }
};

