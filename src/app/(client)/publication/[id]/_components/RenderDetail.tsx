'use client'
import { getPublication } from '@/apiRequest/publicationApi'
import TabPanelCustom from '@/components/TabPanelCustom'
import { PublicationTypeResponse } from '@/lib/types/PublicationType'
import { handleErrorCode } from '@/lib/utils/common'
import { CircularProgress } from '@mui/material'
import * as React from 'react'

export interface IRenderDetailProps {
  publicationId: string
}

export default function RenderDetail(props: IRenderDetailProps) {
  const { publicationId } = props
  const [publication, setPublication] = React.useState<PublicationTypeResponse>(
    {} as PublicationTypeResponse
  )
  const [loading, setLoading] = React.useState<boolean>(true)
  const fetchPublication = async () => {
    try {
      const res = await getPublication(publicationId)
      setPublication(res.data)
    } catch (error: any) {
      handleErrorCode(error)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    if (publicationId) fetchPublication()
  }, [publicationId])
  const listTabs = [
    {
      label: 'Thông tin cơ bản',
      value: '1',
      content: (
        <div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Tên ấn phẩm: </h4>
            <span>{publication?.name}</span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Các tác giả: </h4>
            <span>
              {publication?.authors !== null
                ? publication.authors
                    ?.map((author) => author.fullName)
                    .join(', ')
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Nhà xuất bản: </h4>
            <span>
              {publication?.publisher !== null
                ? publication.publisher?.name
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>ISBN: </h4>
            <span>{publication?.isbn !== null ? publication.isbn : 'N/A'}</span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>ISSN: </h4>
            <span>{publication?.issn !== null ? publication.issn : 'N/A'}</span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Ký hiệu phân loại: </h4>
            <span>
              {publication?.classify !== null ? publication.classify : 'N/A'}
            </span>
          </div>
        </div>
      ),
    },
    {
      label: 'Thông tin chi tiết',
      value: '2',
      content: (
        <div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Ngôn ngữ: </h4>
            <span>
              {publication?.language !== null
                ? publication.language?.description
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Kho: </h4>
            <span>
              {publication?.warehouse !== null
                ? publication.warehouse?.name
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Nơi xuất bản: </h4>
            <span>
              {publication?.placeOfPublication !== null
                ? publication?.placeOfPublication
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Năm xuất bản: </h4>
            <span>
              {publication?.yearOfPublication !== null
                ? publication?.yearOfPublication
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Thể loại: </h4>
            <span>
              {publication?.categories !== null
                ? publication.categories
                    ?.map((category) => category.name)
                    .join(', ')
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Chủ đề: </h4>
            <span>
              {publication?.topics !== null
                ? publication.topics?.map((topic) => topic.name).join(', ')
                : 'N/A'}
            </span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Kích thước: </h4>
            <span>{publication?.size !== null ? publication.size : 'N/A'}</span>
          </div>
          <div className='flex gap-3'>
            <h4 className='font-semibold'>Số trang: </h4>
            <span>
              {publication?.pageCount !== null ? publication?.pageCount : 'N/A'}
            </span>
          </div>
        </div>
      ),
    },
    {
      label: 'Mô tả',
      value: '3',
      content: <div>{publication?.description}</div>,
    },
  ]
  return (
    <div className='flex justify-center h-screen'>
      <div className='container mt-5'>
        {loading ? (
          <div className='flex justify-center items-center h-screen'>
            <div className='flex justify-center items-center'>
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div className='flex items-start gap-3'>
            <img
              src={publication.bannerImg}
              alt={publication.name}
              className='w-[200px]'
            />
            <TabPanelCustom listTabs={listTabs} />
          </div>
        )}
      </div>
    </div>
  )
}
