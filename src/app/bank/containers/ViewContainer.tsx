'use client'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import ViewForm from '../components/ViewForm'
import { BulletList } from 'react-content-loader'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getBank, removeBank } from '../services/actions'
import { notFound } from 'next/navigation'
import useRequest from '@/app/global/hooks/useRequest'

const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('bank', 'list')

  const [form, setForm] = useState([])

  const { isLoading } = useRequest(`/bank/api/bank/view/${seq}`)

  const onRemove = useCallback(() => {
    removeBank(seq)
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const bank = await getBank(seq)
        setForm(bank)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  if (!form) {
    notFound()
  }

  return (
    <>
      {isLoading ? <Loading /> : <ViewForm form={form} onRemove={onRemove} />}
    </>
  )
}

export default React.memo(ViewContainer)

// return <ViewForm form={form} />

// export default React.memo(ViewContainer)
