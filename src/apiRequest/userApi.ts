import instant from '@/lib/axiosCustom'
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
