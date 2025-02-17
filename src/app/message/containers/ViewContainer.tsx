'use client'
import React, { useLayoutEffect, useState } from 'react'
import ViewForm from '../components/ViewForm'
import { getMessage } from '../services/actions'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const ViewConatiner = ({ seq }) => {
  useMenuCode('message', 'view')
  const [data, setData] = useState([])
  useLayoutEffect(() => {
    ;(async () => {
      try {
        const _data = await getMessage(seq)
        setData(_data)
      } catch (err) {
        console.error(err)
        return
      }
    })()
  }, [seq])

  return <ViewForm data={data} />
}

export default React.memo(ViewConatiner)
