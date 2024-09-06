import axiosInstance from "./axiosInstance";

export const fetchProducts = async () => {
    try {
        const response = await axiosInstance.get('/products'); // / คือ baseURL ที่ตั้งไว้
        return response.data;
    } catch (error) {
        throw new Error('service can not online');
    }
};

export const createProduct = async (body:any) => {
    try {
        const response = await axiosInstance.post('/products/create', body); // / คือ baseURL ที่ตั้งไว้
        return response.data;
    } catch (error) {
        throw new Error('service can not online');
    }
}

export const deleteProduct = async (id:string) => {
    try {
        const response = await axiosInstance.delete(`/products/${id}` ); // / คือ baseURL ที่ตั้งไว้
        return response.data;
    } catch (error) {
        throw new Error('service can not online');
    }
}
