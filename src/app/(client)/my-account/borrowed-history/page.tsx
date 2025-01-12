import { Box, Typography } from '@mui/material'
import * as React from 'react'

export interface IBorrowedHistoryProps {}

export default function BorrowedHistory(props: IBorrowedHistoryProps) {
  return (
    <Box>
      <Typography variant='h5' className='border-b-4 border-b-red-800 w-fit'>
        Borrowed History
      </Typography>
    </Box>
  )
}
