'use client'
import React from 'react'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'
import LayerPopup from './LayerPopup'

const Wrapper = styled.iframe<CommonType>`
  width: 1050px;
  height: 750px;
`

type Props = {
  email?: string
  onClose: () => void
  isOpen: boolean
}

const MessagePopup = ({ email, onClose, isOpen }: Props) => {
  const url =
    process.env.NEXT_PUBLIC_FRONT_URL +
    `/message/write?popup=true&email=${email}`
  return (
    <LayerPopup
      title="쪽지 보내기"
      isOpen={isOpen}
      onClose={onClose}
      width={1120}
      height={910}
    >
      <Wrapper src={url} frameBorder={0} scrolling="auto"></Wrapper>
    </LayerPopup>
  )
}

export default React.memo(MessagePopup)
