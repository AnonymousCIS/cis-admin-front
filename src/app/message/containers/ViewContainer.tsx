'use client'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import ViewForm from '../components/ViewForm'
import { deleteMessage, getMessage } from '../services/actions'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const ViewConatiner = ({ seq }) => {
  useMenuCode('message', 'view')

  const [data, setData] = useState([])

  const onDelete = useCallback(() => {
    deleteMessage(seq)
  }, [seq])
  
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

  return <ViewForm data={data} onDelete={onDelete} />
}

export default React.memo(ViewConatiner)
