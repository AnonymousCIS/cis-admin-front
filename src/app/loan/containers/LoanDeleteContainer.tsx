'use client'

import React, { useLayoutEffect, useState, useActionState } from 'react'
import { getLoan } from '../services/actions'
import { deleteLoan } from '../services/actions'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import LoanModal from '../components/LoanModal'

type Props = {
  seq?: number | undefined
  closeModal: any | undefined
}

const Loading = () => <BulletList />

const LoanDeleteContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})

  const { data, isLoading } = useRequest(`/loan/api/loan/view/${seq}`)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const loan = await getLoan(seq)
        setForm(loan)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  const actionState = useActionState(deleteLoan, seq)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <LoanModal
          form={form}
          actionState={actionState}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default React.memo(LoanDeleteContainer)
