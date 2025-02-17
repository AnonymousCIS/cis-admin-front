'use client'

import React, { useState, useCallback, useLayoutEffect } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import { getLogView } from '../services/actions'
import { notFound } from 'next/navigation'
import LogViewForm from '@/app/card/components/LogViewForm'

const Loading = () => <BulletList />

const LoanLogContainer = ({
  seq,
}: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'log')

  const [form, setForm] = useState([])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const log = await getLogView(seq)
        console.log('log', log)
        if (!log) notFound()
        else {
          setForm(log)
        }
      } catch (err) {
        console.error(err)
        notFound()
      }
    })()
  }, [seq])
  return <LogViewForm form={form} />
}
export default React.memo(LoanLogContainer)
