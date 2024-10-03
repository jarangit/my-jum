import axiosInstance from "./axiosInstance"

export const categoryServiceApi = {
  createCategory: async (data: { name: string, description: string }) => {
    return await axiosInstance.post('/auth/category/create', data)
  },
  getCategoryByUserId: async (id: number) => {
    return await axiosInstance.get(`/auth/category/list`)
  },
  deleteCategory: async (id: number) => {
    return await axiosInstance.delete(`/auth/category/${id}`)
  }
}