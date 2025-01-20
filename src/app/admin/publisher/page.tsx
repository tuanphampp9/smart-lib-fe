'use client'
import * as React from 'react'
import FormPublisher from './_components/FormPublisher'
import TablePublisher from './_components/TablePublisher'

export interface IPublisherProps {}

export default function Publisher(props: IPublisherProps) {
  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <FormPublisher />
      </div>
      <div className='w-2/3'>
        <TablePublisher />
      </div>
    </div>
  )
}
