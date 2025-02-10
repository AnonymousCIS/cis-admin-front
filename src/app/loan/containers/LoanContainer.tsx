'use client'

import React, { useState, useCallback, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import LoanForm from '../components/LoanForm'
import { processLoan } from '../services/actions'

const LoanContainer = () => {
  const searchParams = useSearchParams()
  const params = { redirectUrl: searchParams.get('redirectUrl') }
  const actionState = useActionState(processLoan, params)
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
    <LoanForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      actionState={actionState}
    />
  )
}

export default React.memo(LoanContainer)
