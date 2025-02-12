import React, { useLayoutEffect, useState } from 'react'
import ViewForm from '../components/ViewForm'
import { BulletList } from 'react-content-loader'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getCard } from '../services/actions'

// const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'list')

  const [form, setForm] = useState([])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getCard(seq)
        setForm(card)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  return <ViewForm form={form} />
}

export default React.memo(ViewContainer)
