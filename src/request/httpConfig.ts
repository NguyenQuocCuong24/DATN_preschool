import { handleErrorCode, handleSuccess } from "@/src/utils/client/common";
import { normalizePath } from "@/src/utils/client/global";
// import { LoginResType } from "@/validations/auth.schema";
import { redirect } from "next/navigation";
type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

const AUTHENTICATION_ERROR_STATUS = 401;

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: string | number | boolean | object | null;
  };
  constructor({
    status,
    payload,
    message = "Lỗi HTTP",
  }: {
    status: number;
    payload: {
      message: string;
      [key: string]: string | number | boolean | object | null;
    };
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
    if (isClient) {
      console.log("1111: ", this.payload);
      
      handleErrorCode(this.payload);
    }
  }
}

let clientLogoutRequest: null | Promise<any> = null;
const isClient = typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData || method == "DELETE"
      ? {}
      : {
          "Content-Type": "application/json",
        };
  if (isClient) {
    const token = localStorage.getItem("token");
    if (token) {
      baseHeaders.Authorization = `Bearer ${token}`;
    }
  }
  const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API : options.baseUrl;

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });
  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (!clientLogoutRequest) {
        clientLogoutRequest = fetch("/api/auth/logout", {
          method: "POST",
          body: null,
          headers: {
            ...baseHeaders,
          } as any,
        });
        try {
          await clientLogoutRequest;
        } catch (error) {
          console.log(error);
        } finally {
          if (isClient) {
            localStorage.removeItem("token");
          }
          clientLogoutRequest = null;
          redirect(`/login`);
        }
      }
    } else {
      new HttpError(data as { status: number; payload: any });
    }
  } else {
    if(method == "POST" || method == "PATCH" || method == "DELETE"){
        handleSuccess()
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  patch<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
