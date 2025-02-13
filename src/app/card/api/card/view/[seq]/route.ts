import { NextRequest, NextResponse } from 'next/server'
import apiRequest from '@/app/global/libs/apiRequest'

export async function GET(request: NextRequest) {
  const seq = request.nextUrl.pathname.split('/').pop()

  const apiUrl = process.env.API_URL + `/card/view/${seq}`

  const res = await apiRequest(apiUrl)

  if (res.status === 200) {
    // 성공시

    const result = await res.json()

    return NextResponse.json(result)
  }

  // 실패시
  return NextResponse.json(false)
}
