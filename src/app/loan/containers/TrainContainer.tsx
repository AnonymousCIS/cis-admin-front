'use client'
import React, { useState, useCallback } from 'react'
import TrainForm from '../components/TrainForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { loanTrain } from '../services/actions'

const TrainContainer = () => {
  useMenuCode('loan', 'train')
  const [insert, setInsert] = useState<boolean>(false)

  const onProcess = useCallback(() => {
    console.log('유입')
    ;(async () => {
      const message = await loanTrain()
      setInsert(true)
      console.log('message', message)
    })()
  }, [])

  return (
    <>
      <TrainForm onProcess={onProcess} />
    </>
  )
}

export default React.memo(TrainContainer)
