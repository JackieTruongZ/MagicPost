import axios, { AxiosRequestConfig } from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const API_URL = "http://localhost:3333";
export class BaseService {
    
    async login(formData:any) {
        let axiosConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': 'http://localhost:3333',
            },
          };
          console.log(formData);
        
          const res = await axios.post(`${API_URL}/auth/signin`, formData, axiosConfig);
          return res;
    }

    async getUser() {
        const bearver = window.localStorage.getItem('access_token')
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Authorization' : `Bearer ${bearver}`
            }
        };
        
        return await axios.get(`${API_URL}${'/users/me'}`, axiosConfig);
    }
}