import apiRequest from '@/app/global/libs/apiRequest'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.searchParams.toString()

  const apiUrl =
    process.env.API_URL + `/message/admin/list${qs.trim() ? '?' + qs : ''}`
  /* const apiUrl = `https://cis-message-service.koreait.xyz/list${
    qs.trim() ? '?' + qs : ''
  }` */
  const res = await apiRequest(apiUrl)
  console.log('res', res)

  if (res.status === 200) {
    // 성공시

    const result = await res.json()

    return NextResponse.json(result)
  }

  // 실패시
  return NextResponse.json({ sucess: false })
}
