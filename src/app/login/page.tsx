'use client'
import { Box, Button, FormControl, Typography } from '@mui/material'
import * as React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { StyledTextField } from '@/styles/commonStyle'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useRouter, useSearchParams } from 'next/navigation'
import { login, setTokenNextServer } from '@/apiRequest/authApi'
import { handleErrorCode } from '@/lib/utils/common'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setInfoUser } from '@/store/slices/userSlice'
export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Tên đăng nhập không được để trống'),
      password: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    }),
    onSubmit: async (values) => {
      console.log(values)
      try {
        const res = await login(values.username, values.password)
        const lastPage = params.get('redirect')
        if (res.status === 200) {
          localStorage.setItem('token', res.data.data.access_token)
          //set token into next server
          await setTokenNextServer(res.data.data.access_token)
          toast.success('Đăng nhập thành công')
          if (res.data.data.user.role.name === 'ADMIN') {
            router.push(lastPage || '/admin')
          } else if (res.data.data.user.role.name === 'READER') {
            router.push(lastPage || '/')
          }
          dispatch(
            setInfoUser({
              user: res.data.data.user,
            })
          )
        }
      } catch (error: any) {
        console.log(error.response)
        handleErrorCode(error)
      }
    },
  })
  return (
    <Box className='w-screen h-screen flex justify-center items-center'>
      <Box>
        <Box className='border-b-4 border-red-800'>
          <Typography
            variant='h5'
            fontWeight={500}
            className='px-4 py-3 bg-red-800 w-fit !text-white rounded-tl-md rounded-tr-md '
          >
            Đăng nhập
          </Typography>
        </Box>
        <Box className='w-[800px] rounded-sm shadow-2xl p-4'>
          <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <Typography fontWeight={400}>Tên đăng nhập</Typography>
            <FormControl variant='outlined' fullWidth>
              <StyledTextField
                margin='normal'
                fullWidth
                id='username'
                placeholder={'Nhập tên đăng nhập'}
                name='username'
                className='!mt-1'
                value={formik.values.username}
                onChange={formik.handleChange}
                autoFocus
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </FormControl>
            <Typography fontWeight={400}>Mật khẩu</Typography>
            <FormControl variant='outlined' fullWidth>
              <StyledTextField
                margin='normal'
                fullWidth
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder={'Nhập mật khẩu'}
                className='!mt-1'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <Box
                        className='cursor-pointer'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <RemoveRedEyeIcon />
                        )}
                      </Box>
                    ),
                  },
                }}
              />
            </FormControl>
            <Box>
              <Box className='mt-4 flex justify-center gap-3'>
                <Button
                  type='submit'
                  className='!bg-red-800 !text-white rounded-md w-fit !px-6 !py-3 hover:!bg-red-500'
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => {
                    router.push('/forget-password')
                  }}
                  className='!bg-blue-800 !text-white rounded-md w-fit !px-6 !py-3 hover:!bg-blue-500'
                >
                  Quên mật khẩu
                </Button>
              </Box>
              <Box className='mt-4'>
                <Typography>
                  Bạn chưa có tài khoản?
                  <Button
                    onClick={() => {
                      router.push('/register')
                    }}
                    className='!text-blue-800'
                  >
                    Đăng ký
                  </Button>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
