'use client'
import React, { useState, useCallback, useEffect } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'
import ListItem from '../components/LogListForm'
import { toQueryString } from '@/app/global/libs/utils'

const Loading = () => <BulletList />
type SearchType = {
  page?: number
  limit?: number
}

const ListSearchContainer = () => {
  useMenuCode('card', 'train')

  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()
  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/card/api/card/logs${qs.trim() ? '?' + qs : ''}`,
  )
  useEffect(() => {
    if (data) {
      setItems(data.data.data)
      setPagination(data.data.pagination)
    }
  }, [data])

  const onPageClick = useCallback((page) => {
    page = page ?? 1
    setSearch((search) => ({ ...search, page }))
  }, [])

  return (
    <>
      {isLoading ? <Loading /> : <ListItem items={items} />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(ListSearchContainer)
