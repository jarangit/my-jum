import axiosInstance from "../axiosInstance";

export const productService = {
  getProductById: async (id: number) => {
    return await axiosInstance.get(`products/${id}`);
  },

  getProductByUserId: async (userId: number) => {
    return await axiosInstance.get(`products/user/${userId}`);
  },

  incrementViewCount: async (id: number) => {
    return await axiosInstance.get(`products/view/${id}`);
  }
}

