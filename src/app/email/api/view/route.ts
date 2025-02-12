import { NextRequest, NextResponse } from 'next/server'
import { getLogView } from '../../services/actions'

export async function GET(request: NextRequest) {
  const seq = request.nextUrl.pathname.split('/').pop()

  const email = await getLogView(seq)
  console.log('email', email)
  return NextResponse.json(email ?? {})
}