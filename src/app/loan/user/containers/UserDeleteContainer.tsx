'use client'

import React, { useLayoutEffect, useState, useActionState } from 'react'
import { deleteLoan, getUserLoan } from '../services/actions'
import { BulletList } from 'react-content-loader'
import UserModal from '../components/UserModal'


type Props = {
  seq?: number | undefined
  closeModal: any | undefined
}

const Loading = () => <BulletList />

const CardDeleteContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useLayoutEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const card = await getUserLoan(seq)
        setForm(card)
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
        <UserModal
          form={form}
          actionState={actionState}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default React.memo(CardDeleteContainer)
