// 사용자 정의 Hook

'use client'

import { useContext } from 'react'
import UserContext from '../contexts/UserContext'

export default function useUser() {
  const {
    state: { userInfo, isLogin, isAdmin },
  } = useContext(UserContext)

  // 필요한거만 꺼내쓰도록 배열이 아닌 객체로
  return { userInfo, isLogin, isAdmin }
}
