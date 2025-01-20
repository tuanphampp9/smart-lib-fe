'use client'
import * as React from 'react'
import FormTopic from './_components/FormTopic'
import TableTopic from './_components/TableTopic'
export interface ITopicProps {}

export default function Topic(props: ITopicProps) {
  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <FormTopic />
      </div>
      <div className='w-2/3'>
        <TableTopic />
      </div>
    </div>
  )
}
