'use client'
import * as React from 'react'
import FormAuthor from './_components/FormAuthor'
import TableAuthor from './_components/TableAuthor'

export interface IAuthorProps {}

export default function Author(props: IAuthorProps) {
  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <FormAuthor />
      </div>
      <div className='w-2/3'>
        <TableAuthor />
      </div>
    </div>
  )
}
