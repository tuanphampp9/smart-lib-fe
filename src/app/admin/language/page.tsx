'use client'
import * as React from 'react'
import FormLanguage from './_components/FormLanguage'
import TableLanguage from './_components/TableLanguage'

export interface ILanguageProps {}

export default function Language(props: ILanguageProps) {
  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <FormLanguage />
      </div>
      <div className='w-2/3'>
        <TableLanguage />
      </div>
    </div>
  )
}
