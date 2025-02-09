'use client'
import {
  deleteBorrowSlip,
  getListBorrowSlips,
} from '@/apiRequest/borrowSlipApi'
import { BorrowSlipType } from '@/lib/types/BorrowSlipsType'
import { pageInfo } from '@/lib/types/commonType'
import {
  convertSlugify,
  formatDateTime,
  handleErrorCode,
} from '@/lib/utils/common'
import { Box, Chip, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { Popconfirm, Select } from 'antd'
import { useRouter } from 'next/navigation'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import * as React from 'react'
import { toast } from 'react-toastify'
import TableCustom from '@/components/TableCustom'
import PaginationCustom from '@/components/PaginationCustom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export interface IBorrowedHistoryProps {}

export default function BorrowedHistory(props: IBorrowedHistoryProps) {
  const [pageInfo, setPageInfo] = React.useState<pageInfo>({
    page: 1,
    itemPerPage: 5,
    totalItem: 0,
    totalPage: 0,
  })
  const user = useSelector((state: RootState) => state.user.user)
  const router = useRouter()
  const [listBorrowSlips, setListBorrowSlips] = React.useState<
    BorrowSlipType[]
  >([])
  const [borrowSlipSelected, setBorrowSlipSelected] =
    React.useState<BorrowSlipType>({} as BorrowSlipType)

  const [loading, setLoading] = React.useState<boolean>(false)
  const fetchListBorrowSlips = async (
    page: number,
    size: number,
    cardId: string = '',
    status: string = ''
  ) => {
    try {
      let filter = cardId ? `cardRead.cardId: '${cardId}'` : ''
      if (status) {
        filter += ` and status: '${status}'`
      }
      setLoading(true)
      const res = await getListBorrowSlips(page, size, filter)
      setPageInfo({
        page: res.data.meta.page,
        itemPerPage: res.data.meta.pageSize,
        totalItem: res.data.meta.total,
        totalPage: res.data.meta.pages,
      })
      setListBorrowSlips(res.data.result)
    } catch (error: any) {
      handleErrorCode(error)
    } finally {
      setLoading(false)
    }
  }
  React.useEffect(() => {
    if (user.id)
      fetchListBorrowSlips(1, pageInfo.itemPerPage, user.cardRead.cardId)
  }, [user.id])
  console.log(user)

  const renderLabelStatus: Record<string, string> = {
    BORROWING: 'Đang mượn',
    RETURNED: 'Đã trả',
    OVER_DUE: 'Quá hạn',
    NOT_BORROWED: 'Chưa mượn',
  }

  const columns: GridColDef[] = [
    {
      field: 'registerDate',
      headerName: 'Ngày đăng ký',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        if (!params.value) return ''
        return formatDateTime(params.value as string)
      },
    },
    {
      field: 'expiredRegisterDate',
      headerName: 'Ngày hết hạn đăng ký',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        if (!params.value) return ''
        return formatDateTime(params.value as string)
      },
    },
    {
      field: 'borrowDate',
      headerName: 'Ngày mượn',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        if (!params.value) return ''
        return formatDateTime(params.value as string)
      },
    },
    {
      field: 'dueDate',
      headerName: 'Ngày hẹn trả',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        if (!params.value) return ''
        return formatDateTime(params.value as string)
      },
    },
    {
      field: 'returnDate',
      headerName: 'Ngày trả',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        if (!params.value) return ''
        return formatDateTime(params.value as string)
      },
    },
    {
      field: 'publications',
      headerName: 'Những ấn phẩm mượn',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <div className='flex flex-col'>
            {params.row.borrowSlipDetails.map((item: any, index: number) => {
              return (
                <div
                  className='mt-1 text-blue-500 hover:underline cursor-pointer'
                  key={index}
                  onClick={() => {
                    window.open(
                      `/publication/${convertSlugify(item.nameBook)}-${item.publicationId}.html`,
                      '_blank'
                    )
                  }}
                >
                  {index + 1}. {item.nameBook} /{' '}
                  {item.registrationUnique.registrationId} /{' '}
                  {item.registrationUnique.status}
                </div>
              )
            })}
          </div>
        )
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Chip
            label={renderLabelStatus[params.value as string]}
            variant='filled'
            color={'primary'}
          />
        )
      },
    },
    {
      field: 'note',
      headerName: 'Ghi chú',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return params.value
      },
    },
    {
      field: 'delete',
      headerName: 'Xoá',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        if (params.row.status === 'NOT_BORROWED')
          return (
            <Popconfirm
              title='Thông báo'
              description={`Bạn có chắc chắn muốn xóa phiếu mượn này không?`}
              okText='Có'
              cancelText='Không'
              overlayStyle={{
                maxWidth: '300px',
              }}
              onConfirm={() => handleDeleteBorrowSlip(params.row.id)}
            >
              <DeleteOutlineIcon className='cursor-pointer' color='error' />
            </Popconfirm>
          )
      },
    },
  ]

  const getPaginatedTableRows = async (selected: number) => {
    try {
      await fetchListBorrowSlips(
        selected,
        pageInfo.itemPerPage,
        user.cardRead.cardId
      )
    } catch (error: any) {
      handleErrorCode(error)
    }
  }
  const handleChangePerPage = async (perPage: number) => {
    await fetchListBorrowSlips(1, perPage, user.cardRead.cardId)
  }

  const handleDeleteBorrowSlip = async (borrowSlipId: string) => {
    try {
      await deleteBorrowSlip(borrowSlipId)
      toast.success('Xóa phiếu mượn thành công')
      fetchListBorrowSlips(
        pageInfo.page,
        pageInfo.itemPerPage,
        user.cardRead.cardId
      )
    } catch (error: any) {
      handleErrorCode(error)
    }
  }
  return (
    <div>
      <Select
        style={{ width: 120 }}
        onChange={(value) =>
          fetchListBorrowSlips(
            1,
            pageInfo.itemPerPage,
            user.cardRead.cardId,
            value as string
          )
        }
        defaultValue={''}
        options={[
          { value: '', label: 'Tất cả' },
          { value: 'BORROWING', label: 'Đang mượn' },
          { value: 'RETURNED', label: 'Đã trả' },
          { value: 'OVERDUE', label: 'Qúa hạn' },
          { value: 'NOT_BORROWED', label: 'Chưa mượn' },
        ]}
      />
      <Box>
        <TableCustom
          rows={listBorrowSlips}
          columns={columns}
          checkboxSelection={false}
          isLoading={loading}
        />
        <PaginationCustom
          pageInfo={pageInfo}
          getPaginatedTableRows={getPaginatedTableRows}
          onChangePerPage={handleChangePerPage}
          lengthItem={listBorrowSlips.length}
        />
      </Box>
    </div>
  )
}
