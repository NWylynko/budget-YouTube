import Axios, { AxiosRequestConfig } from 'axios';
import useSWR, { mutate } from 'swr'
import { Configuration, Fetcher } from 'swr/dist/types';

export const axios = Axios.create({
  // baseURL: 'http://localhost:3000/api/',
  baseURL: '/api/',
  timeout: 60000,
});

const fetcher = (url: string, axiosConfig?: AxiosRequestConfig) => axios.get(url, axiosConfig).then(res => res.data)

export function useApi<T>(url: string, params?: any, initialData?: T) { return useSWR<T>(url, (url) => fetcher(url, { params }), { initialData }) }

export { mutate }