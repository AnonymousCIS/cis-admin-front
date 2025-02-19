'use client'

import React from 'react'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'
import loading from '../assets/images/loading.gif'
import Image from 'next/image'

const Wrapper = styled.div<CommonType>`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 100;
  align-items: center;
  justify-content: center;
`

const Loading = () => {
  return (
    <Wrapper>
      <Image src={loading} width={120} height={120} alt="로딩중" />
    </Wrapper>
  )
}

export default React.memo(Loading)
