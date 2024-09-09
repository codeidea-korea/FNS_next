import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROD_API_URL,
  headers: {
    "system-key": process.env.NEXT_PUBLIC_SYSTEM_KEY,
  },
});

export async function getApi<R>(
  url: string,
): Promise<AxiosResponse<ApiResult<R>>> {
  return await instance.get<R, AxiosResponse<ApiResult<R>>, any>(url);
}
