import axios, { AxiosRequestConfig } from "axios";
import * as dotenv from "dotenv";

dotenv.config();
const API_URL = "https://magicpost-60b7.onrender.com";
//const API_URL = "http://localhost:3333";

export class BaseService {
  async login(formData: any) {
    let axiosConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3333",
      },
    };
    console.log(formData);

    const res = await axios.post(
      `${API_URL}/auth/signin`,
      formData,
      axiosConfig
    );
    return res;
  }

  async getUser() {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };

    return await axios.get(`${API_URL}${"/users/me"}`, axiosConfig);
  }

  async getOrderById(orderId: string) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };

    return await axios.get(
      `${API_URL}${"/order/order/"}${orderId}`,
      axiosConfig
    );
  }

  async getPointInProvinceById(orderId: string) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };

    return await axios.get(
      `${API_URL}${"/order/order/"}${orderId}`,
      axiosConfig
    );
  }

  async getTransByProvinceId(proviceId: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.get(
      `${API_URL}${"/trans/province/"}${proviceId}`,
      axiosConfig
    );
  }

  async getHubsByProvinceId(proviceId: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.get(
      `${API_URL}${"/hub/province/"}${proviceId}`,
      axiosConfig
    );
  }

  async createOrder(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:3333",
        Authorization: `Bearer ${bearver}`,
      },
    };
    console.log(formData);

    const res = await axios.post(
      `${API_URL}/order/add-order`,
      formData,
      axiosConfig
    );
    return res;
    }
  async createTrans(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/trans/add-trans"}`,
      formData,
      axiosConfig
    );
  }
  async createHub(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/hub/add-hub"}`,
      formData,
      axiosConfig
    );
  }

  async getTransById(transId: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.get(
      `${API_URL}${"/trans/trans/"}${transId}`,
      axiosConfig
    );
  }

  async getHubsById(hubId: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.get(
      `${API_URL}${"/hub/hub/"}${hubId}`,
      axiosConfig
    );
  }
}
