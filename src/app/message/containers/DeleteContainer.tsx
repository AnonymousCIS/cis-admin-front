'use client'

import useRequest from '@/app/global/hooks/useRequest'
import React, { useActionState, useLayoutEffect, useState } from 'react'
import { List } from 'react-content-loader'
import { deleteMessage, getMessage } from '../services/actions'

const Loading = () => <List />

type Props = {
  seq?: number
  closeModal: any | undefined
}

const DeleteContainer = ({ seq, closeModal }: Props) => {
  const [form, setForm] = useState({})

  const { data, isLoading } = useRequest(`/message/api/view/${seq}`)

  console.log('data', data, 'isLoading', isLoading)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const message = await getMessage(seq)
        setForm(message)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  // const actionState = useActionState(deleteMessage, undefined)

  return <></>
}

export default React.memo(DeleteContainer)
