'use client'

import React, { useState, useCallback, useActionState } from 'react'

import { useSearchParams } from 'next/navigation'

import CreateForm from '../components/CreateForm'

import { processCreate } from '../services/actions'

import useMenuCode from '@/app/global/hooks/useMenuCode'

const CreateContainer = () => {
  useMenuCode('card', 'create')

  const searchParams = useSearchParams()

  const params = { redirectUrl: searchParams.get('redirectUrl') }

  const actionState = useActionState(processCreate, params)

  const [form, setForm] = useState({})

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  // const onClick = useCallback((field, value) => {
  //   setForm((form) => ({ ...form, [field]: value }))
  // }, [])

  return (
    <CreateForm
      actionState={actionState}
      form={form}
      onChange={onChange}
      /* onClick={onClick} */
    />
  )
}

export default React.memo(CreateContainer)
