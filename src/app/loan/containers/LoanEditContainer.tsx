'use client'

import React, {
  useState,
  useCallback,
  useActionState,
  useLayoutEffect,
} from 'react'
import { updateLoan } from '../services/actions'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getLoan } from '../services/actions'
import LoanEdit from '../components/LoanEdit'

const initialValue = {
  isOpen: false,
  category: 'CREDITLOAN',
}

const LoanEditContainer = ({ seq }: { seq?: number | undefined }) => {
  useMenuCode('loan', 'update')

  const [form, setForm] = useState(initialValue)

  const actionState = useActionState(updateLoan, undefined)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const loan = await getLoan(seq)
        if (loan) {
          loan.mode = 'update'
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

  return (
    <LoanEdit
      form={form}
      onChange={onChange}
      onClick={onClick}
      actionState={actionState}
    />
  )
}

export default React.memo(LoanEditContainer)
