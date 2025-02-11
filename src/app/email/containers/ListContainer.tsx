'use client'

// import React, { useState, useCallback, useActionState, useEffect } from 'react'
import React, { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ListForm from '../components/ListForm'
import { getLogInfo } from '../services/actions'

const ListContainer = () => {
  const searchParams = useSearchParams()
  const params = searchParams.get('skey')

  const [form, setForm] = useState({ skey: params })
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const emailLogs = async () => {
      const data = await getLogInfo()
      if (data) setLogs(data)
    }
    emailLogs()
  }, [])

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <ListForm form={form} onChange={onChange} logs={logs} onSubmit={onSubmit} />
  )
}

export default React.memo(ListContainer)
