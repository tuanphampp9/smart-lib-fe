'use client'
import * as React from 'react'
import FormWarehouse from './_components/FormWarehouse'
import TableWarehouse from './_components/TableWarehouse'

export interface IWarehouseProps {}

export default function Warehouse(props: IWarehouseProps) {
  return (
    <div className='flex gap-4'>
      <div className='w-1/3'>
        <FormWarehouse />
      </div>
      <div className='w-2/3'>
        <TableWarehouse />
      </div>
    </div>
  )
}
