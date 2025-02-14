'use client'

import React, { useMemo } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import type { CommonType } from '../types/StyledType'
import colors from '../styles/colors'
import sizes from '../styles/sizes'
import { AiOutlineCloseSquare } from 'react-icons/ai'

const { info, white, dark, danger } = colors
const { big, normal } = sizes

const Wrapper = styled.div<CommonType>`
  position: relative;
  font-size: ${normal};

  .close {
    top: -20px;
    right: -20px;
    font-size: ${big};
    // font-size: 40px;
    position: absolute;
    cursor: pointer;
    color: ${danger};
  }

  h1 {
    color: ${dark};
    font-size: ${big};
    padding: 0 10px 15px;
    border-bottom: 2px solid ${info};
    margin-bottom: 20px;
  }
`

// 적용할 ID, layout.tsx body ID = root
Modal.setAppElement('#root')

type Props = {
  width?: number
  height?: number
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const LayerPopup = ({
  width,
  height,
  isOpen,
  onClose,
  title,
  children,
}: Props) => {
  // 없을 경우 기본 값
  width = width ?? 350
  height = height ?? 350

  // LayerPopup 안에 있으니 렌더링 될때마다 정의되어 메모리 낭비되므로
  // width, height 값이 바뀔때만 렌더링 되도록 useMemo
  const customStyles = useMemo(
    () => ({
      content: {
        width,
        height,
        top: `calc((100% - ${height}px) / 2)`,
        left: `calc((100% - ${width}px) / 2)`,
        background: white,
        padding: 40,
        borderRadius: 25,
      },
    }),
    [width, height],
  )

  return (
    isOpen && (
      <Modal isOpen={isOpen} style={customStyles}>
        <Wrapper>
          <AiOutlineCloseSquare onClick={onClose} className="close" />
          {title && <h1>{title}</h1>}
          {children}
        </Wrapper>
      </Modal>
    )
  )
}

export default React.memo(LayerPopup)
