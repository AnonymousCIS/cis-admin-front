'use client'

import { MainTitle } from '@/app/global/components/StyledTitle'
import React from 'react'

const ViewPage = ({ params }) => {
  const { seq } = React.use<{ seq: number }>(params)

  return (
    <>
      <MainTitle>로그 단일 조회</MainTitle>
    </>
  )
}
