import Axios from "axios";
import useSWR from "swr";
import { Configuration, Fetcher } from "swr/dist/types";

export const axios = Axios.create({
  // baseURL: 'http://localhost:3000/api/',
  baseURL: "/api/",
  timeout: 5000
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useApi<T>(url: string, config?: Partial<Configuration<T, any, Fetcher<T>>>) {
  return useSWR<T>(url, fetcher, {...config, refreshInterval: 5000});
}
