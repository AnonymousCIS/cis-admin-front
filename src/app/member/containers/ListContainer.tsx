'use client'

import React, { useState, useCallback, useEffect } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import ListForm from '../components/ListForm'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'
import MemberSearch from '../components/MemberSearch'

const Loading = () => <BulletList />
type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
}

const ListContainer = () => {
  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  useMenuCode('member', 'list')
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/member/api/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  useEffect(() => {
    if (data) {
      setItems(data.data.data)
      setPagination(data.data.pagination)
      console.log(data.data.data)
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
      <MemberSearch form={_search} onChange={onChange} onSubmit={onSubmit} />
      {isLoading ? <Loading /> : <ListForm form={items} />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(ListContainer)
