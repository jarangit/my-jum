import axiosInstance from "./axiosInstance";

export const likeService = {
  toggleLikes: async (productId: number) => {
    return await axiosInstance.post(`/auth/likes/toggle/${productId}`,)
  }
}
