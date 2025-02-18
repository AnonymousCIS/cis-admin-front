import { NextRequest, NextResponse } from 'next/server'
import apiRequest from '@/app/global/libs/apiRequest'
import { error } from 'console'

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.searchParams.toString()

  const apiUrl =
    process.env.API_URL + `/card/recommend/list${qs.trim() ? '?' + qs : ''}`

  const res = await apiRequest(apiUrl)

  if (res.status === 200) {
    console.log('유입성공')
    const result = await res.json()

    return NextResponse.json(result)
  }
  console.error(error)
  // 실패시
  return NextResponse.json({ sucess: false })
}
