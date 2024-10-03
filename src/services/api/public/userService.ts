import axiosInstance from "../axiosInstance";

export const userService = {
  getUserById: async (id: number) => {
    return await axiosInstance.get(`user/${id}`);
  }
}

