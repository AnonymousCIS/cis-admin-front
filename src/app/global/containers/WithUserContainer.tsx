// 고차 함수 = with+이름 관례

'use client'

import { useState, useEffect } from 'react'
import loadable from '@loadable/component'
import useUser from '../hooks/useUser'
import LoginContainer from '@/app/member/containers/LoginContainer'
import { MainContentBox } from '../components/ContentBox'
import { MainTitle } from '../components/StyledTitle'
import { usePathname, useSearchParams } from 'next/navigation'
import { unauthorized } from 'next/navigation'
import Loading from '../components/Loading'

export default function WithUserContainer(UserContainer) {
  // 로그인 상태일때만 가능한 컨테이너 = UserContainer

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const timeoutId = setTimeout(function () {
      setLoading(false)
    }, 1500) // 1.5초

    return () => {
      // 뒷정리 함수
      clearTimeout(timeoutId)
    }
  }, [])

  const { isLogin, isAdmin } = useUser()

  const pathname = usePathname()

  const searchParams = useSearchParams()

  const redirectUrl = `${pathname}?${searchParams}`

  if (isLogin && !isAdmin) unauthorized()

  // 로그인 상태일 경우 현재 컨테이너
  // 로그인 상태가 아닐 경우 로그인 컨테이너쪽 페이지로, 이후 로그인시 원래 접근하려던 주소로 이동
  return isLogin ? (
    loading ? (
      <Loading />
    ) : (
      UserContainer
    )
  ) : (
    <MainContentBox max={450} min={350}>
      <MainTitle>로그인</MainTitle>
      <LoginContainer redirectUrl={redirectUrl} />
    </MainContentBox>
  )
}
