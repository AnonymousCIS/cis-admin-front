'use client'
import { useSearchParams } from 'next/navigation'

/**
 * 쿼리스트링 -> 객체 변환
 * 
 * @param arrayTypes 
 * @returns 
 */
// 없을수도 있어서 ?.
export default function useQueryString(arrayTypes?: string[]) {
  // Browser의 요청 쿼리스트링 가져옴
  const searchParams = useSearchParams()
  const qs = searchParams.toString()
  // t1=100&t2=100
  return qs
    ? qs.split('&').reduce((acc, q) => {
        const [k, v] = q.split('=')

        // 배열일 경우 고려
        if (arrayTypes && arrayTypes.includes(k)) {
          acc[k] = acc[k] ?? []
          acc[k].push(v)
        } else {
          acc[k] = v
        }

        return acc
      }, {})
    : {}
}
