import { get } from "http";
import axiosInstance from "./axiosInstance";

export const userService = {
  login: async (payload: { username: string, password: string }) => {
    try {
      const response = await axiosInstance.post('users/login', payload); // / คือ baseURL ที่ตั้งไว้
      if (response) {
        sessionStorage.setItem('token', response.data.access_token);
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  getUserById: async (id: number) => {
    const response = await axiosInstance.get(`users/${id}`); // / คือ baseURL ที่ตั้งไว้
    return response.data;
  }
}

