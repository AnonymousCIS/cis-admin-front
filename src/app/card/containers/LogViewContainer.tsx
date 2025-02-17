'use client'

import React, { useState, useCallback, useLayoutEffect } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import LogViewItem from '../components/ViewForm'
import { getLogView } from '../services/actions'
import { notFound, useSearchParams } from 'next/navigation'
import LogViewForm from '../components/LogViewForm'

const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'train')

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
export default React.memo(ViewContainer)
