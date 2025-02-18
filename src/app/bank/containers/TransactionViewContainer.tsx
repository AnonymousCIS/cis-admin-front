'use client'
import React, { useLayoutEffect, useState } from 'react'
import ViewForm from '../components/Transaction/ViewForm'
import { BulletList } from 'react-content-loader'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getTransaction } from '../services/actions'
import { notFound } from 'next/navigation'

import useRequest from '@/app/global/hooks/useRequest'

const Loading = () => <BulletList />

const TransactionViewContainer = ({ seq }) => {
  useMenuCode('bank', 'transaction')
  const [form, setForm] = useState([])

  const { isLoading } = useRequest(`/bank/api/Transaction/view/${seq}`)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const bank = await getTransaction(seq)
        setForm(bank)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  if (!form) {
    notFound()
  }

  return <>{isLoading ? <Loading /> : <ViewForm form={form} />}</>
}

export default React.memo(TransactionViewContainer)
