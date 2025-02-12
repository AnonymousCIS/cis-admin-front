'use client'

import React, { useState, useCallback, useEffect } from 'react'
import LoanList from '../components/LoanList'
import LoanSearch from '../components/LoanSearch'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'

import useMenuCode from '@/app/global/hooks/useMenuCode'

const Loading = () => <BulletList />

type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
}

const LoanListContainer = () => {
  useMenuCode('loan', 'list')

  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/loan/api/loan/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  useEffect(() => {
    if (data) {
      setItems(data.data.items)
      setPagination(data.data.pagination)
      console.log(data)
    }
  }, [data])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      console.log('_search', _search)

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
      <LoanSearch form={_search} onChange={onChange} onSubmit={onSubmit} />
      {isLoading ? <Loading /> : <LoanList />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(LoanListContainer)
