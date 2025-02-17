'use client'

import React, { useLayoutEffect, useState, useActionState } from 'react'
import { getLoan } from '../services/actions'
import { deleteLoan } from '../services/actions'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import RecommendModal from '../components/RecommendModal'

type Props = {
  seq?: number | undefined
  closeModal: any | undefined
}

const Loading = () => <BulletList />

const LoanDeleteContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useLayoutEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const loan = await getLoan(seq)
        setForm(loan)
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    })()
  }, [seq])

  const actionState = useActionState(deleteLoan, seq)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <RecommendModal
          form={form}
          actionState={actionState}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default React.memo(LoanDeleteContainer)
