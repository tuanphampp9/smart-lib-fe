import { toast } from 'react-toastify'
import { GENDER_ENUM } from '../constant/common'
import dayjs from 'dayjs'

export const handleErrorCode = (error: any, customActionErr?: () => void) => {
  const errorMessage = `${error.response?.data?.statusCode}: ${error.response?.data?.message}`
  toast.error(errorMessage)
  if (customActionErr) {
    customActionErr()
  }
}

export const showGender: Record<GENDER_ENUM, string> = {
  MALE: 'Nam',
  FEMALE: 'Nữ',
  OTHER: 'Khác',
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'N/A'
  const formats = ['DD-MM-YYYY', 'YYYY-MM-DD', 'DD/MM/YYYY'] // format date
  let parsedDate

  // try parse with every format
  for (const format of formats) {
    const date = dayjs(dateString, format, true) // 'true' to ensure accurate parsing according to format
    if (date.isValid()) {
      parsedDate = date
      break
    }
  }

  // Check if the input is a valid ISO datetime
  if (!parsedDate && dayjs(dateString).isValid()) {
    parsedDate = dayjs(dateString) // Parse ISO datetime
  }
  // if parsed then format to 'DD/MM/YYYY', if not then return 'Invalid Date'
  return parsedDate ? parsedDate.format('DD/MM/YYYY') : 'Invalid Date'
}
