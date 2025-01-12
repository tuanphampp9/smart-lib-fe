import { UserType } from '@/lib/types/userType'
import axios from 'axios'
const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL
export const register = async (user: UserType) => {
  const response = await axios.post(`${API_DOMAIN}/v1/auth/register`, user)
  return response
}

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_DOMAIN}/v1/auth/login`, {
    username,
    password,
  })
  return response
}

export const setTokenNextServer = async (token: string) => {
  const response = await axios.post(`/apis/authLogin`, {
    token,
  })
  return response
}
