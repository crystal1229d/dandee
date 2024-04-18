import { getDay, parseISO } from 'date-fns'

export function getYoilOfDate(dateString: string): string {
  if (!dateString) return ''

  const date = parseISO(dateString)
  const dayOfWeek = getDay(date)
  const 요일 = ['일', '월', '화', '수', '목', '금', '토'][dayOfWeek]

  return 요일
}
