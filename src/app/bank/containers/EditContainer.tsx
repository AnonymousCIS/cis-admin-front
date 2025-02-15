'use client'

import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useActionState,
} from 'react'
import { getBank, processEdit } from '../services/actions'
import { BulletList } from 'react-content-loader'
import EditForm from '../components/EditForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import useRequest from '@/app/global/hooks/useRequest'

const initialValue = {
  mode: 'edit',
  bankName: '',
  accountNumber: '',
  name: '',
  password: '',
}

type Props = {
  seq?: number | undefined
  closeModal: any | undefined
}

const EditContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})

  const { data, isLoading } = useRequest(`/bank/api/view/${seq}`)

  console.log('data', data)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const bank = await getBank(seq)
        if (bank) {
          setForm({ ...bank, mode: 'edit' })
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
      actionState={actionState}
      form={form}
      onChange={onChange}
      onReset={onReset}
      onClick={onClick}
    />
  )
}

export default React.memo(EditContainer)
