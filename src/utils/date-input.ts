import dayjs from 'dayjs'

export const formatDateInputDate = (date: Date | undefined): string => {
  if (date === undefined) return ''
  return dayjs(date).format('YYYY-MM-DD')
}
export const formatDateInputTime = (date: Date | undefined): string => {
  if (date === undefined) return ''
  return dayjs(date).format('HH:mm')
}
