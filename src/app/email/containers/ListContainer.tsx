'use client'

import React, { useState, useCallback, useActionState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ListForm from '../components/ListForm'
import { getLogInfo } from '../services/actions'

const ListContainer = () => {
  const searchParams = useSearchParams()
  const params = searchParams.get('skey')

  const [form, setForm] = useState({ skey: params })
  const [logs, setLogs] = useState([])

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  useEffect(() => {
    const emailLogs = async () => {
      const data = await getLogInfo()
      if (data) setLogs(data)
    }
    emailLogs()
  }, [])

  return <ListForm form={form} onChange={onChange} logs={logs} />
}

export default React.memo(ListContainer)
