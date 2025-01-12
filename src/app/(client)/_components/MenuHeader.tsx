import * as React from 'react'
import { Typography } from '@mui/material'
import Link from 'next/link'

export interface IMenuHeaderProps {}

export default function MenuHeader(props: IMenuHeaderProps) {
  return (
    <div className='flex items-center '>
      <Link
        href='/'
        className='px-2 py-4 hover:bg-red-800 hover:text-white cursor-pointer text-black text-xl'
      >
        Tra cứu
      </Link>
      <Link
        href='/my-account'
        className='px-2 py-4 hover:bg-red-800 hover:text-white cursor-pointer text-black text-xl'
      >
        Trang cá nhân
      </Link>
    </div>
  )
}
