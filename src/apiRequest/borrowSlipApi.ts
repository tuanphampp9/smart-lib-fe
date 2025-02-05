import instant from '@/lib/axiosCustom'
const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL
export const createBorrowSlipForClient = async (data: {
  cardId: string
  cartIds: string[]
}) => {
  const response = await instant.post(
    `${API_DOMAIN}/v1/client/borrow-slips`,
    data
  )
  return response
}

export const getListBorrowSlips = async (
  page: number,
  itemPerPage: number,
  filter: string
) => {
  const response = await instant.get(`${API_DOMAIN}/v1/borrow-slips`, {
    params: {
      page,
      size: itemPerPage,
      filter,
      sort: 'createdAt,desc',
    },
  })
  return response
}
