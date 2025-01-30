import instant from '@/lib/axiosCustom'
import { UserType } from '@/lib/types/userType'
const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL
export const getListReaders = async (
  page: number,
  itemPerPage: number,
  filter: string
) => {
  const response = await instant.get(`${API_DOMAIN}/v1/users`, {
    params: {
      page,
      size: itemPerPage,
      filter,
    },
  })
  return response
}

export const getReader = async (id: string) => {
  const response = await instant.get(`${API_DOMAIN}/v1/users/${id}`)
  return response
}

export const changePassword = async (data: {
  email: string
  oldPassword: string
  newPassword: string
}) => {
  const response = await instant.put(
    `${API_DOMAIN}/v1/users/change-password`,
    data
  )
  return response
}

export const createUser = async (user: UserType) => {
  const response = await instant.post(`${API_DOMAIN}/v1/users`, user)
  return response
}

export const updateUser = async (user: UserType) => {
  const response = await instant.put(`${API_DOMAIN}/v1/users`, user)
  return response
}

export const createRating = async (data: {
  userId: string
  publicationId: string
  rating: number | null
}) => {
  const response = await instant.post(`${API_DOMAIN}/v1/users/ratings`, data)
  return response
}

export const getRating = async (userId: string, publicationId: string) => {
  const response = await instant.get(
    `${API_DOMAIN}/v1/users/${userId}/ratings/${publicationId}`
  )
  return response
}
