import { NextRequest, NextResponse } from 'next/server'
import { getLogView } from '@/app/card/services/actions'

export async function GET(request: NextRequest) {
  const seq = request.nextUrl.pathname.split('/').pop()

  const log = await getLogView(seq)

  return NextResponse.json(log ?? {})
}
