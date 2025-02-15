'use client'

import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useActionState,
} from 'react'
import { getBank, processEdit } from '../services/actions'
import EditForm from '../components/EditForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const initialValue = {
  mode: 'edit',
  bankName: '',
  accountNumber: '',
  name: '',
  password: '',
}

const EditContainer = ({ seq }: { seq?: string | undefined } | undefined) => {
  useMenuCode('bank', 'editForm')
  const [form, setForm] = useState(initialValue)

  const actionState = useActionState(processEdit, undefined)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const bank = await getBank(seq)
        if (bank) {
          bank.mode = 'edit'
          setForm(bank)
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
    <EditForm
      form={form}
      onChange={onChange}
      onReset={onReset}
      onClick={onClick}
      actionState={actionState}
    />
  )
}

export default React.memo(EditContainer)
