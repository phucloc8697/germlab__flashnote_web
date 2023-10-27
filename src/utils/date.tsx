import dayjs from 'dayjs'

export const isToday = (d: Date | number) => {
  const date = typeof d === 'number' ? dayjs.unix(d) : dayjs(d)
  return date.isSame(dayjs(), 'date')
}

export const formatDate = (d: Date | number) => {
  if (typeof d === 'number') return dayjs.unix(d).format('DD-MM-YYYY')
  return dayjs(d).format('DD-MM-YYYY')
}
