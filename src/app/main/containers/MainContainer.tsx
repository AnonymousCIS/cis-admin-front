'use client'
import React, { useState, useCallback } from 'react'
import LayerPopup from '@/app/global/components/LayerPopup'

const MainContainer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClose = useCallback(() => setIsOpen(false), [])
  const onOpen = useCallback(() => setIsOpen(true), [])

  return (
    <>
      <button type="button" onClick={onOpen}>
        오픈
      </button>
      <LayerPopup
        onClose={onClose}
        isOpen={isOpen}
        title="팝업 제목..."
        width={750}
        height={650}
      >
        <h2>팝업 테스트</h2>
      </LayerPopup>
    </>
  )
}

export default React.memo(MainContainer)
