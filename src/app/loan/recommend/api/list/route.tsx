import { NextRequest, NextResponse } from 'next/server'
import apiRequest from '@/app/global/libs/apiRequest'

export async function GET(request: NextRequest) {
  const qs = request.nextUrl.searchParams.toString()
  console.log('Query String:', qs)

  const apiUrl = process.env.API_URL + `/loan/recommend/list${qs.trim() ? '?' + qs : ''}`
  console.log('API URL:', apiUrl)

  const res = await apiRequest(apiUrl)
  console.log('API Response Status:', res.status)

  if (res.status === 200) {
    const result = await res.json()
    console.log('API Response Data:', result)
    return NextResponse.json(result)
  }

  // 실패시
  return NextResponse.json({ success: false })
}