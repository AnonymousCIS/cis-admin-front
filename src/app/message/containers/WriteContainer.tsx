'use client'

import React, { useActionState, useCallback, useState } from 'react'
import WriteForm from '../components/WriteForm'
import { writeMessage } from '../services/actions'
import { useSearchParams } from 'next/navigation'

const WriteContainer = ({
  email,
}: { email?: string | undefined } | undefined) => {
  const name = email.replace('%', '@')
  const [form, setForm] = useState({})
  // console.log('form', form)

  const onChange = useCallback((e) => {
    setForm((data) => ({ ...data, [e.target.name]: e.target.value }))
  }, [])

  const searchParams = useSearchParams()
  const params = { redirectUrl: searchParams.get('redirectUrl') }

  const actionState = useActionState(writeMessage, params)

  /* const onEditorChange = useCallback(
    (content) => setForm((data) => ({ ...data, content })),
    [],
  ) */

  // const onEditorImage = useCallback(() => setForm(true), [])

  /* const onClick = useCallback((filed, value) => {
    setForm((data) => ({ ...data, [filed]: value }))
  }, []) */
  return (
    <WriteForm
      form={form}
      email={name}
      // onClick={onClick}
      onChange={onChange}
      actionState={actionState}
      // onEditor={onEditorChange}
      // onEditorImage={onEditorImage}
    />
  )
}

export default React.memo(WriteContainer)
