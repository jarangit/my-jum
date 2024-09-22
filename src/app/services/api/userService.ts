import axiosInstance from "./axiosInstance";

export const login = async (payload: { username: string, password: string }) => {
  try {
    const response = await axiosInstance.post('users/login', payload); // / คือ baseURL ที่ตั้งไว้
    if (response) {
      console.log("🚀 ~ login ~ response:", response)
      sessionStorage.setItem('token', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw new Error('service can not online');
  }
}

