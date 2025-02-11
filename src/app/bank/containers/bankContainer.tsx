'use client'

import React, { useState, useCallback, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { processBank } from '../services/actions'
import BankForm from '../components/bankForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const bankContainer = () => {
  useMenuCode('card', 'create')

  const searchParams = useSearchParams()

  const params = { redirectUrl: searchParams.get('redirectUrl') }

  const actionState = useActionState(processBank, params)

  const [form, setForm] = useState({
    isOpen: false,
  })

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])

  return (
    <BankForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      actionState={actionState}
    />
  )
}

export default React.memo(bankContainer)
