'use client'
import { logout } from '@/apiRequest/authApi'
import MenuHeader from '@/app/(client)/_components/MenuHeader'
import { RootState } from '@/store/store'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const { user } = useSelector((state: RootState) => state.user)
  const handleLogout = async () => {
    localStorage.removeItem('token')
    await logout()
    toast.success('Đăng xuất thành công')
  }
  return (
    <div>
      <div className='flex justify-center bg-[#E7E9EF] py-2'>
        <div className='container flex justify-between'>
          {user.fullName ? (
            <div className='flex gap-1 items-center'>
              <span className='text-black'>Xin chào</span>
              <span className='text-blue-600'>{user.fullName}, </span>
              <Link
                href='/login'
                className='text-blue-600'
                onClick={handleLogout}
              >
                Đăng xuất
              </Link>
            </div>
          ) : (
            <div className='flex gap-1 items-center text-black'>
              <Link href='/login'>Đăng nhập</Link>
              <span>/</span>
              <Link href='forget-password'>Quên mật khẩu</Link>
              <span>/</span>
              <Link href='/register'>Đăng ký</Link>
            </div>
          )}
          <span className='text-black'>Giỏ ấn phẩm</span>
        </div>
      </div>
      <div className='flex justify-center bg-[#FEF6D3] py-4'>
        <div className='container'>
          <Typography variant='h4' className='uppercase'>
            Thư viện số TH
          </Typography>
        </div>
      </div>
      <Box className='flex justify-center'>
        <div className='container'>
          <MenuHeader />
        </div>
      </Box>
    </div>
  )
}
