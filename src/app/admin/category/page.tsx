'use client'
import * as React from 'react'
import FormCategory from './_components/FormCategory'
import TableCategory from './_components/TableCategory'

export interface ICategoryProps {}

export default function Category(props: ICategoryProps) {
  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <FormCategory />
      </div>
      <div className='w-2/3'>
        <TableCategory />
      </div>
    </div>
  )
}
