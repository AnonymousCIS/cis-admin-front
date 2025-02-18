'use client'
import React, { useState, useCallback, useEffect } from 'react'
import ListForm from '../components/ListForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import ListSearch from '../components/ListSearch'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'
import ListItem from '../components/ListForm'
import useQueryString from '@/app/global/hooks/useQueryString'

const Loading = () => <BulletList />

type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
}

const ListSearchContainer = () => {
  useMenuCode('email', 'list')

  const _qs = useQueryString()

  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>(_qs)

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>(_qs)

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/email/api/list${qs.trim() ? '?' + qs : ''}`,
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

      // Submit 했을때 Search 값을 새로운 객체로 깊은 복사해 교체하면서 Rerendering
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
      <ListSearch form={_search} onChange={onChange} onSubmit={onSubmit} />
      {isLoading ? <Loading /> : <ListItem items={items} />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(ListSearchContainer)
