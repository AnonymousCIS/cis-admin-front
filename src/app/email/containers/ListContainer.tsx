'use client'

// import React, { useState, useCallback, useActionState, useEffect } from 'react'
import React, { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ListForm from '../components/ListForm'
import { getLogInfo } from '../services/actions'


const ListContainer = () => {


  const [logs, setLogs] = useState([])

  useEffect(() => {
    const emailLogs = async () => {
      const data = await getLogInfo()
      if (data) setLogs(data)
    }
    emailLogs()
  }, [])


  const onSubmit = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <ListForm  logs={logs} />
  )
}

export default React.memo(ListContainer)
