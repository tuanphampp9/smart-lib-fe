'use client'
import { getListBorrowSlips } from '@/apiRequest/borrowSlipApi'
import { BorrowSlipType } from '@/lib/types/BorrowSlipsType'
import { pageInfo } from '@/lib/types/commonType'
import { formatDateTime, handleErrorCode } from '@/lib/utils/common'
import { Box, Button, Chip, IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import TableCustom from '@/components/TableCustom'
import PaginationCustom from '@/components/PaginationCustom'
import { getReader } from '@/apiRequest/userApi'
import { UserType } from '@/lib/types/userType'
import DialogCustom from '@/components/DialogCustom'
import Card from '@/components/Card'
import VisibilityIcon from '@mui/icons-material/Visibility'
export interface IBorrowPublicationProps {}

export default function BorrowPublication(props: IBorrowPublicationProps) {
  const [reader, setReader] = React.useState<UserType>({} as UserType)
  const [pageInfo, setPageInfo] = React.useState<pageInfo>({
    page: 1,
    itemPerPage: 5,
    totalItem: 0,
    totalPage: 0,
  })
  const [openModalViewDetail, setOpenModalViewDetail] =
    React.useState<boolean>(false)
  const [openModalCardReader, setOpenModalCardReader] =
    React.useState<boolean>(false)
  const router = useRouter()
  const [listBorrowSlips, setListBorrowSlips] = React.useState<
    BorrowSlipType[]
  >([])
  const [borrowSlipSelected, setBorrowSlipSelected] =
    React.useState<BorrowSlipType>({} as BorrowSlipType)
  const [loading, setLoading] = React.useState<boolean>(false)
  const fetchListBorrowSlips = async (page: number, size: number) => {
    try {
      setLoading(true)
      const res = await getListBorrowSlips(page, size, '')
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
    fetchListBorrowSlips(1, pageInfo.itemPerPage)
  }, [])

  const renderLabelStatus: Record<string, string> = {
    BORROWING: 'Đang mượn',
    RETURNED: 'Đã trả',
    OVER_DUE: 'Quá hạn',
    NOT_BORROWED: 'Chưa mượn',
  }
  const fetchReader = async (readerId: string) => {
    try {
      const res = await getReader(readerId)
      setReader(res.data)
      setOpenModalCardReader(true)
    } catch (error: any) {
      handleErrorCode(error)
    }
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
      field: 'cardId',
      headerName: 'Thẻ mượn',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <span
            className='cursor-pointer text-blue-500 hover:underline'
            onClick={() => fetchReader(params.row.cardRead.id)}
          >
            {params.row.cardRead.cardId}
          </span>
        )
      },
    },
    {
      field: 'ViewDetail',
      headerName: 'Xem chi tiết',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              setOpenModalViewDetail(true)
              setBorrowSlipSelected(params.row as BorrowSlipType)
            }}
          >
            <VisibilityIcon />
          </IconButton>
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
      field: 'edit',
      headerName: 'Sửa',
      headerAlign: 'left',
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              router.push(
                `/admin/import-publications/detail?importReceiptId=${params.row.id}`
              )
            }}
          >
            <EditIcon />
          </IconButton>
        )
      },
    },
  ]

  const getPaginatedTableRows = async (selected: number) => {
    try {
      await fetchListBorrowSlips(selected, pageInfo.itemPerPage)
    } catch (error: any) {
      handleErrorCode(error)
    }
  }
  const handleChangePerPage = async (perPage: number) => {
    await fetchListBorrowSlips(1, perPage)
  }
  const renderStatusPublication: Record<string, string> = {
    AVAILABLE: 'Có sẵn',
    BORROWED: 'Đang mượn',
    LOST: 'Thất lạc',
  }
  const columnBorrowSlipDetails: GridColDef[] = [
    {
      field: 'registrationId',
      headerName: 'ĐKKB',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return params.row.registrationUnique.registrationId
      },
    },
    {
      field: 'nameBook',
      headerName: 'Tên ấn phẩm',
      minWidth: 220,
      headerAlign: 'left',
      align: 'left',
      flex: 1,
      renderCell: (params) => {
        return params.value
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 220,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return renderStatusPublication[params.row.registrationUnique.status]
      },
    },
  ]
  return (
    <div>
      <div className='flex justify-end my-4'>
        <Button
          startIcon={<AddIcon />}
          variant='contained'
          onClick={() => {
            router.push('/admin/import-publications/detail')
          }}
        >
          Thêm phiếu mượn
        </Button>
      </div>
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
      {openModalCardReader && (
        <DialogCustom
          title={``}
          isModalOpen={openModalCardReader}
          setIsModalOpen={setOpenModalCardReader}
          children={
            <div>
              <Card reader={reader} />
            </div>
          }
        />
      )}
      {openModalViewDetail && (
        <DialogCustom
          title='Chi tiết phiếu mượn'
          isModalOpen={openModalViewDetail}
          setIsModalOpen={setOpenModalViewDetail}
          width={800}
          children={
            <div>
              <TableCustom
                rows={borrowSlipSelected.borrowSlipDetails ?? []}
                columns={columnBorrowSlipDetails}
                checkboxSelection={false}
                isLoading={loading}
              />
            </div>
          }
        />
      )}
    </div>
  )
}
