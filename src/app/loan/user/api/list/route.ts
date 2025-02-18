import { NextRequest, NextResponse } from 'next/server'
import apiRequest from '@/app/global/libs/apiRequest'

export async function GET(request: NextRequest) {
  try {
    const qs = request.nextUrl.searchParams.toString()

    const apiUrl =
      process.env.API_URL + `/loan/user/list${qs.trim() ? '?' + qs : ''}`

    const res = await apiRequest(apiUrl)

    if (res.status === 200) {
      console.log('유입성공')
      const result = await res.json()

      return NextResponse.json(result)
    }

    // 상태 코드가 200이 아닌 경우 처리
    console.error('API 요청 실패: ', res.status)
    return NextResponse.json({ success: false })
  } catch (err) {
    // 예외 처리: `err`는 실제 오류 객체입니다.
    console.error('API 요청 중 오류 발생: ', err)
    return NextResponse.json({ success: false, message: '서버 오류' })
  }
}