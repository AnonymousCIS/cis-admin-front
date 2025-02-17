'use client'

import useMenuCode from '@/app/global/hooks/useMenuCode'
import useRequest from '@/app/global/hooks/useRequest'
import { useCallback, useEffect, useState } from 'react'
import { BulletList } from 'react-content-loader'

const Loading = () => <BulletList width={'30%'} />

const ListContainer = () => {
  useMenuCode('loan', 'log')

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const { data } = useRequest(`/email/api/list`)

  useEffect(() => {
    if (data) {
      setItems(data.data.items)
      setPagination(data.data.pagination)
    }
  }, [data])

  const onPageClick = useCallback((page) => {
    page = page ?? 1
  }, [])
}
