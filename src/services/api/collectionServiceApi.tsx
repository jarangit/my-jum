import axiosInstance from "./axiosInstance"

export const collectionServiceApi = {
  createCollection: async (data: { name: string, description: string }) => {
    return await axiosInstance.post('/auth/collection/create', data)
  },
  getCollectionByUserId: async (id: number) => {
    return await axiosInstance.get(`/auth/collection/list`)
  },
  deleteCollection: async (id: number) => {
    return await axiosInstance.delete(`/auth/collection/${id}`)
  }
}