'use client'
import React, { useCallback, useState, useEffect } from 'react'
import ListForm from '../components/ListForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { List } from 'react-content-loader'
import Search from '../components/Search'
import Pagination from '@/app/global/components/Pagination'

const Loading = () => <List />

type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
  status?: 'UNREAD' | 'READ'
}

const ListContainer = () => {
  useMenuCode('message', 'listForm')

  const [search, setSearch] = useState<SearchType>({})

  // 임시값
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/message/api/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  useEffect(() => {
    if (data) {
      setItems(data.data.items)
      setPagination(data.data.pagination)
    }
  }, [data])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setSearch({ ..._search })
    },
    [_search],
  )

  const onPageClick = useCallback((page) => {
    page = page ?? 1
    setSearch((search) => ({ ...search, page }))
  }, [])

  return (
    <>
      <Search form={_search} onChange={onChange} onSubmit={onSubmit} />
      {isLoading ? (
        <Loading />
      ) : (
        <ListForm items={items} onChange={onChange} form={_search} />
      )}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(ListContainer)
