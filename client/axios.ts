import axios from 'axios';

//@ts-ignore
import baseUrl from './api';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
});

export { instance as axios };
