'use client'

import React, { useState, useCallback, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { processEdit } from '../services/actions'
import EditForm from '../components/EditForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const EditContainer = () => {
  useMenuCode('bank', 'edit')

  const searchParams = useSearchParams()

  const params = { redirectUrl: searchParams.get('redirectUrl') }

  const actionState = useActionState(processEdit, params)

  const [form, setForm] = useState({ isOpen: false, listUnderView: true })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onReset = useCallback(() => {
    setForm((form) => ({ ...form }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])

  return (
    <EditForm
      actionState={actionState}
      form={form}
      onChange={onChange}
      onReset={onReset}
      onClick={onClick}
    />
  )
}

export default React.memo(EditContainer)
