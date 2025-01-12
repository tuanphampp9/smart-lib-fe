import { Box, Typography } from '@mui/material'

export interface IMyAccountProps {}

export default function MyAccount(props: IMyAccountProps) {
  return (
    <Box>
      <Typography variant='h5' className='border-b-4 border-b-red-800 w-fit'>
        My Account
      </Typography>
    </Box>
  )
}
