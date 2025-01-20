import instant from '@/lib/axiosCustom'
const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL
export const getListLanguages = async (
  page: number,
  itemPerPage: number,
  filter: string
) => {
  const response = await instant.get(`${API_DOMAIN}/v1/languages`, {
    params: {
      page,
      size: itemPerPage,
      filter,
      sort: 'createdAt,desc',
    },
  })
  return response
}

export const createLanguage = async (data: {
  name: string
  description: string
}) => {
  const response = await instant.post(`${API_DOMAIN}/v1/languages`, data)
  return response
}

export const updateLanguage = async (data: {
  id: string
  name: string
  description: string
}) => {
  const response = await instant.put(
    `${API_DOMAIN}/v1/languages/${data.id}`,
    data
  )
  return response
}

export const deleteLanguage = async (id: string) => {
  const response = await instant.delete(`${API_DOMAIN}/v1/languages/${id}`)
  return response
}
