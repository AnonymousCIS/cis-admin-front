'use client'

// import React, { useState, useCallback, useActionState } from 'react'
import React from 'react'
// 메모사용
// import { useSearchParams } from 'next/navigation'
// 쿼리파라미터 가져올때
// import CreateForm from '../components/bankForm'
// 폼 UI
// import { processCreate } from '../services/actions'
// import BankForm from '../components/bankForm'
// 폼 제출시 데이터 처리하는 곳

// type Props = {
//   redirectUrl?: string
// }

// const BankContainer = ({ redirectUrl }: Props) => {
const BankContainer = () => {
  /*
  const searchParams = useSearchParams()
  const params = { redirectUrl: redirectUrl ?? searchParams.get('redirectUrl') }

  const actionState = useActionState(processCreate, params)

  const [form, setForm] = useState({})

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])
  */

  return (
    // <BankForm
    //   actionState={actionState}
    //   form={form}
    //   handleChange={onChange}
    //   onClick={onClick}
    // />
    <></>
  )
}

export default React.memo(BankContainer)
