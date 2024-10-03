import axiosInstance from "./axiosInstance";

export const productServiceApi = {
    fetchProducts: async () => {
        try {
            const response = await axiosInstance.get('/products'); // / คือ baseURL ที่ตั้งไว้
            return response.data;
        } catch (error) {
            throw new Error('service can not online');
        }
    },
    getProductByUserId: async (id: number) => {
        return await axiosInstance.get(`/auth/products/user/${id}`)
    },
    createProduct: async (body: any) => {
        try {
            const response = await axiosInstance.post('/auth/products/create', { ...body }); // / คือ baseURL ที่ตั้งไว้
            return response.data;
        } catch (error) {
            throw new Error('service can not online');
        }
    },
    deleteProduct: async (id: string) => {
        try {
            const response = await axiosInstance.delete(`/auth/products/${id}`); // / คือ baseURL ที่ตั้งไว้
            return response.data;
        } catch (error) {
            throw new Error('service can not online');
        }
    }
}
