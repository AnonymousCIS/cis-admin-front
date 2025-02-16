'use client'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import ViewForm from '../components/ViewForm'
//import { BulletList } from 'react-content-loader'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getCard, removeCard } from '../services/actions'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import { notFound } from 'next/navigation'

const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'list')

  const [form, setForm] = useState({})

  const { isLoading } = useRequest(`/card/api/card/view/${seq}`)

  const onRemove = useCallback(() => {
    removeCard(seq)
  }, [seq])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getCard(seq)
        // console.log('card', card)
        setForm(card)
      } catch (err) {
        console.error(err)
        //notFound()
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
