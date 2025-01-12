import instant from '@/lib/axiosCustom'
const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL
export const createCard = async (email: string) => {
  const response = await instant.post(`${API_DOMAIN}/v1/create-card-reader`, {
    email,
  })
  return response
}
