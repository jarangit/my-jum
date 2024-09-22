import axios from 'axios';
const token = sessionStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // ใช้ตัวแปรสภาพแวดล้อมที่เรากำหนดไว้
    timeout: 10000, // ตั้งเวลา timeout (ในมิลลิวินาที)
    headers: {
        'Content-Type': 'application/json',
        'Authorization': ` Bearer ${token}`
    },
});

// คุณสามารถเพิ่ม interceptors ได้ที่นี่ถ้าจำเป็น
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        // สามารถจัดการ error ทั่วไปที่นี่
        return Promise.reject(error);
    }
);

export default axiosInstance;
