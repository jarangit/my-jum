import { jwtDecode } from "jwt-decode"

export const isTokenExp = (token: string) => {
  if (!token) {
    return
  }

  try {
    const decode = jwtDecode(token)
    const now = Date.now() / 1000;

    if (!decode.exp) {
      return true
    }

    return decode.exp < now

  } catch (error) {
    // console.error('Error decoding token:', error);
    return true; // ถ้า decode ไม่ได้ ถือว่า token หมดอายุ
  }

}