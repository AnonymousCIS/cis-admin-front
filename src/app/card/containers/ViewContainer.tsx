import React, { useCallback, useLayoutEffect, useState } from 'react'
import ViewForm from '../components/ViewForm'
//import { BulletList } from 'react-content-loader'
import { notFound } from 'next/navigation'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getCard, removeCard } from '../services/actions'
import { useSearchParams } from 'next/navigation'

// const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'list')

  const [form, setForm] = useState([])

  const onRemove = useCallback(() => {
    removeCard(seq)
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getCard(seq)
        console.log('card', card)
        if (!card) notFound()
        else {
          setForm(card)
        }
      } catch (err) {
        console.error(err)
        notFound()
      }
    })()
  }, [seq])

  return <ViewForm form={form} onRemove={onRemove} />
}

export default React.memo(ViewContainer)
