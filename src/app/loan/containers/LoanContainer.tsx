'use client'

import React, {
  useState,
  useCallback,
  useActionState,
  useLayoutEffect,
} from 'react'
import LoanForm from '../components/LoanForm'
import { processLoan } from '../services/actions'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getLoan } from '../services/actions'

const initialValue = {
  mode: 'add',
  isOpen: false,
  category: 'CREDITLOAN',
}

const LoanContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('loan', 'create')

  const [form, setForm] = useState(initialValue)

  const actionState = useActionState(processLoan, undefined)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const loan = await getLoan(seq)
        if (loan) {
          loan.mode = 'edit'
          setForm(loan)
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])

  const onReset = useCallback(() => {
    setForm(initialValue)
  }, [])

  return (
    <LoanForm
      form={form}
      onChange={onChange}
      onClick={onClick}
      actionState={actionState}
      onReset={onReset}
    />
  )
}

export default React.memo(LoanContainer)
