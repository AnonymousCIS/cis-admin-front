import React, { useLayoutEffect, useState } from 'react'
import ViewForm from '../components/ViewForm'
import { BulletList } from 'react-content-loader'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getBank } from '../services/actions'

const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('bank', 'list')

  const [form, setForm] = useState([])

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

  return <ViewForm form={form} />
}

export default React.memo(ViewContainer)
