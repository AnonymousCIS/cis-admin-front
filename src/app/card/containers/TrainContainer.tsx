'use client'
import React, { useState, useCallback } from 'react'
import TrainForm from '../components/TrainForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { cardTrain } from '../services/actions'

const TrainContainer = () => {
  useMenuCode('card', 'train')
  const [insert, setInsert] = useState<boolean>(false)

  const onProcess = useCallback(() => {
    console.log('유입')
    ;(async () => {
      const message = await cardTrain()
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
