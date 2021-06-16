import Axios from 'axios';
import useSWR from 'swr'


export const axios = Axios.create({
  baseURL: 'http://192.168.0.109:3000/api/',
  timeout: 1000,
});

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function useApi<T>(url: string) { return useSWR<T>(url, fetcher) }