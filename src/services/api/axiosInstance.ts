import axios from 'axios';
import { error } from 'console';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // ใช้ตัวแปรสภาพแวดล้อมที่เรากำหนดไว้
    timeout: 10000, // ตั้งเวลา timeout (ในมิลลิวินาที)
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = ` Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// คุณสามารถเพิ่ม interceptors ได้ที่นี่ถ้าจำเป็น
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // สามารถจัดการ error ทั่วไปที่นี่
        return Promise.reject(error);
    }
);

export default axiosInstance;
