import axios, { AxiosRequestConfig } from "axios";
import * as dotenv from "dotenv";

dotenv.config();

  // const API_URL = "https://magicpost-183b.onrender.com";
const API_URL = "http://localhost:3333";

export class BaseService {
  // auth service ---------------------------------------------------------------------------------//
  async login(formData: any) {
    let axiosConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": API_URL,
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

  // auth service ---------------------------------------------------------------------------------//

  // order service ---------------------------------------------------------------------------------//

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

  async createOrder(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": API_URL,
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

  // order service ---------------------------------------------------------------------------------//

  // point Service --------------------------------------------------------------------------------//

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
    return await axios.get(`${API_URL}${"/hub/hub/"}${hubId}`, axiosConfig);
  }

  async getUserOnPoint(pointId: string) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.get(
      `${API_URL}${"/users/user-on-point/"}${pointId}`,
      axiosConfig
    );
  }

  async addUserOnPoint(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/users/add-auth"}`,
      formData,
      axiosConfig
    );
  }

  async getAllUser(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/users/get-all-users"}`,
      formData,
      axiosConfig
    );
  }

  async createUser(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/users/create-user"}`,
      formData,
      axiosConfig
    );
  }

  async getAllOrder(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/order"}`,
      formData,
      axiosConfig
    );
  }

  async findOrderOnPoint(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/find-order-on-trans-hub"}`,
      formData,
      axiosConfig
    );
  }
  async findOrderWaitOnTrans(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/find-order-wait-on-trans"}`,
      formData,
      axiosConfig
    );
  }


  async findOrderMoveInPoint(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/find-order-from-trans-hub"}`,
      formData,
      axiosConfig
    );
  }

  async findOrderMoveOutPoint(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/find-order-moving-trans-hub"}`,
      formData,
      axiosConfig
    );
  }

  async findOrderSuccessFailReturn(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/find-order-success-fail-return"}`,
      formData,
      axiosConfig
    );
  }
  async confirmOrderOnTrans(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/confirm-order-on-trans"}`,
      formData,
      axiosConfig
    );
  }
  async confirmOrderFromTrans(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/confirm-order-from-trans"}`,
      formData,
      axiosConfig
    );
  }
  async confirmOrderOnHub(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/confirm-order-on-hub"}`,
      formData,
      axiosConfig
    );
  }
  async confirmOrderFromHub(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/confirm-order-from-hub"}`,
      formData,
      axiosConfig
    );
  }

  async confirmOrderSuccessFail(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/confirm-order-success-fail"}`,
      formData,
      axiosConfig
    );
  }

  async confirmOrderFailOnTrans(formData: any) {
    const bearver = window.localStorage.getItem("access_token");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${bearver}`,
      },
    };
    return await axios.post(
      `${API_URL}${"/order/confirm-order-fail-on-trans"}`,
      formData,
      axiosConfig
    );
  }
}
