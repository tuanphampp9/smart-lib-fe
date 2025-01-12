'use client'
import { getReader } from '@/apiRequest/userApi'
import { UserType } from '@/lib/types/userType'
import { formatDate, handleErrorCode } from '@/lib/utils/common'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import * as React from 'react'
import BarCode from '@/components/BarCodeCustom'
import dynamic from 'next/dynamic'
import { Box, CircularProgress } from '@mui/material'
export interface IPrintCardProps {}

export default function PrintCard(props: IPrintCardProps) {
  const [reader, setReader] = React.useState<UserType>()
  const searchParam = useSearchParams()
  const params = new URLSearchParams(searchParam.toString())
  const readerId = params.get('readerId') ?? ''
  const [loading, setLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    const fetchReader = async () => {
      try {
        setLoading(true)
        const res = await getReader(readerId)
        console.log(res)
        setReader(res.data)
      } catch (error: any) {
        handleErrorCode(error)
      } finally {
        setLoading(false)
      }
    }
    if (readerId) {
      fetchReader()
    }
  }, [readerId])
  console.log(reader)
  return (
    <div className='flex h-screen w-screen justify-center items-center'>
      {loading ? (
        <Box className='flex justify-center items-center w-[310px] h-[200px]'>
          <CircularProgress />
        </Box>
      ) : (
        <div className='w-[420px] h-[300px] shadow-lg rounded-md p-4'>
          <div className='flex items-center gap-2'>
            <img
              src={reader?.portraitImg ?? ''}
              alt='ảnh chân dung'
              width={70}
              height={80}
            />
            <div>
              <h3 className='text-blue-400 py-1 border-b-2 border-b-gray-500 text-center'>
                Thư viện TH
              </h3>
              <h3 className='mt-2 font-semibold uppercase text-center'>
                Thẻ mượn - đọc
              </h3>
              <div>
                Họ tên:{' '}
                <span className='font-semibold'>{reader?.fullName}</span>
              </div>
              <div>
                Năm sinh: <span>{formatDate(reader?.dob ?? '')}</span>
              </div>
              <div>
                Địa chỉ: <span>{reader?.address}</span>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <BarCode value={reader?.cardRead.cardId} width={1.2} height={50} />
            <span>HSD: {formatDate(reader?.cardRead.expiredAt ?? '')}</span>
          </div>
        </div>
      )}
    </div>
  )
}
