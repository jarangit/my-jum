import axiosInstance from "../axiosInstance";

export const productService = {
  getProductById: async (id: number) => {
    return await axiosInstance.get(`products/${id}`);
  }
}

