'use client'

import React, {
  useState,
  useCallback,
  useActionState,
  useLayoutEffect,
} from 'react'

import { useSearchParams } from 'next/navigation'

import CreateForm from '../components/CreateForm'

import { processCreate, getCard } from '../services/actions'

import useMenuCode from '@/app/global/hooks/useMenuCode'

const initialValue = {
  // 기본값, 변경 가능성 있어서 useState({})안이 아닌 밖에 따로 정의

  mode: 'add',
  open: false,
}

const CreateContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'create')

  // const searchParams = useSearchParams()

  // const params = { redirectUrl: searchParams.get('redirectUrl') }

  // const actionState = useActionState(processCreate, params)
  const actionState = useActionState(processCreate, undefined)

  const [form, setForm] = useState(initialValue)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getCard(seq)
        if (card) {
          card.mode = 'edit'
          setForm(card)
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

  // const onReset = useCallback(() => {
  //   setForm((form) => ({ ...form }))
  // }, [])
  const onReset = useCallback(() => {
    setForm(initialValue)
  }, [])

  return (
    <CreateForm
      actionState={actionState}
      form={form}
      onChange={onChange}
      onClick={onClick}
      onReset={onReset}
    />
  )
}

export default React.memo(CreateContainer)
