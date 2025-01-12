import { Box, Typography } from '@mui/material'
import * as React from 'react'

export interface IBorrowedDocumentsProps {}

export default function BorrowedDocuments(props: IBorrowedDocumentsProps) {
  return (
    <Box>
      <Typography variant='h5' className='border-b-4 border-b-red-800 w-fit'>
        Borrowed Documents
      </Typography>
    </Box>
  )
}
