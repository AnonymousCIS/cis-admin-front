import { NextRequest, NextResponse } from 'next/server'
import apiRequest from '@/app/global/libs/apiRequest'

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.searchParams.toString()

  // console.log('qs', qs)

  const apiUrl = process.env.API_URL + `/board/list${qs.trim() ? '?' + qs : ''}`

  // console.log('apiUrl', apiUrl)

  const res = await apiRequest(apiUrl)

  console.log('res', res)

  if (res.status === 200) {
    // 성공시

    const result = await res.json()

    console.log('result', res)

    return NextResponse.json(result)
  }

  // 실패시
  return NextResponse.json({ sucess: false })
}
