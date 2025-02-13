'use client'

import React, { useLayoutEffect, useState, useActionState } from 'react'
import { getCard } from '../services/actions'
import { removeCard } from '../services/actions'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import ModalForm from '../components/ModalForm'

type Props = {
  seq?: number | undefined
  closeModal: any | undefined
}

const Loading = () => <BulletList />

const DeleteContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})

  const { data, isLoading } = useRequest(`/card/api/card/view/${seq}`)

  console.log('data', data)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getCard(seq)
        setForm(card)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  const actionState = useActionState(removeCard, undefined)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ModalForm
          form={form}
          actionState={actionState}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default React.memo(DeleteContainer)
