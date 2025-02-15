import apiRequest from '@/app/global/libs/apiRequest'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const seq = request.nextUrl.pathname.split('/').pop()

  const apiUrl = process.env.API_URL + `/message/view/${seq}`

  const res = await apiRequest(apiUrl)

  if (res.status === 200) {
    //성공
    const result = await res.json()

    return NextResponse.json(result)
  }

  // 실패
  return NextResponse.json(false)
}
