'use client'

import React, { useState, useCallback, useEffect } from 'react'

import ListForm from '../components/ListForm'
import BankSearch from '../components/BankSearch'

import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'

const Loading = () => <BulletList />

type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
}

const ListContainer = () => {
  useMenuCode('bank', 'list')

  // 실제 Submit할때 반영, search 변경시에만 Rerendering / 서치는 검색조건을 담고있고 셋서치가 검색조건을 업데이트 해주는 함수임
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳 / 입력중인것과 검색버튼 누를때적용될 값을 저장하는 걸로..
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const qs = toQueryString(search) // page=2&limit=10

  const { data, error, isLoading } = useRequest(
    `/bank/api/bank/list${qs.trim() ? '?' + qs : ''}`,
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

      console.log('_search', _search)

      // Submit 했을때 Search 값을 새로운 객체로 깊은 복사해 교체하면서 Rerendering
      setSearch({ ..._search })
    },
    [_search],
  )

  const onPageClick = useCallback((page) => {
    page = page ?? 1
    setSearch((search) => ({ ...search, page }))
  }, []) // 클릭한 페이지번호를 서치로..

  return (
    <>
      <BankSearch form={_search} onChange={onChange} onSubmit={onSubmit} />
      {isLoading ? <Loading /> : <ListForm />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(ListContainer)
