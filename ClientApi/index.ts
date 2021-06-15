import axios from 'axios';
import useSWR from 'swr'


const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 1000,
});

const fetcher = (url: string) => instance.get(url).then(res => res.data)

export function useApi<T>(url: string) { return useSWR<T>(url, fetcher) }