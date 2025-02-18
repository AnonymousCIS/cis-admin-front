'use client'

import React, { useState, useCallback, useLayoutEffect } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import LogViewItem from '../components/ViewForm'
import { getLogView } from '../services/actions'
import { notFound } from 'next/navigation'
import ViewForm from '../components/ViewForm'

const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('email', 'view')

  const [form, setForm] = useState([])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const log = await getLogView(seq)
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
  return <ViewForm form={form} />
}
export default React.memo(ViewContainer)
