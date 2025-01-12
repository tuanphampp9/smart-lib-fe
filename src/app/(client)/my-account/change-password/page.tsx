import { Box, Typography } from '@mui/material'
import * as React from 'react'

export interface IChangePasswordProps {}

export default function ChangePassword(props: IChangePasswordProps) {
  return (
    <Box>
      <Typography variant='h5' className='border-b-4 border-b-red-800 w-fit'>
        Change Password
      </Typography>
    </Box>
  )
}
