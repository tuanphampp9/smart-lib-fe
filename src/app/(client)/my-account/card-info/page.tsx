import { Box, Typography } from '@mui/material'
import * as React from 'react'

export interface ICardInfoProps {}

export default function CardInfo(props: ICardInfoProps) {
  return (
    <Box>
      <Typography variant='h5' className='border-b-4 border-b-red-800 w-fit'>
        Card info
      </Typography>
    </Box>
  )
}
