'use client'

import React, { useState, useCallback, useEffect, useContext } from 'react'
import LoanList from '../components/LoanList'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import LoanSearch from '../components/LoanSearch'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'

const Loading = () => <BulletList />

type SearchType = {
  skey?: string
  page?: number
  limit?: number
  loanName?: string
  categories?: string[]
  bankName?: string[]
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
    `/loan/api/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onClick = useCallback(
    (field, value) => {
      const set = new Set(_search.loanName ?? [])
      if (['loanName'].includes(field)) {
        if (set.has(value)) {
          set.delete(value)
        } else {
          set.add(value)
        }
        _setSearch((_search) => ({ ...search, [field]: [...set.values()] }))
        console.log(set)
      } else if (['bankName'].includes(field)) {
        const set2 = new Set(_search.bankName ?? [])
        if (set2.has(value)) {
          set2.delete(value)
        } else {
          set2.add(value)
        }
        _setSearch((_search) => ({ ...search, [field]: [...set2.values()] }))
        console.log(set2)
      } else if (['categories'].includes(field)) {
        const set3 = new Set(_search.categories ?? [])
        if (set3.has(value)) {
          set3.delete(value)
        } else {
          set3.add(value)
        }
        _setSearch((_search) => ({ ...search, [field]: [...set3.values()] }))
        console.log(set3)
      }
    },
    [_search.bankName, _search.categories, _search.loanName, search],
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
  }, [])

  return (
    <>
      <LoanSearch
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
      />
      {isLoading ? <Loading /> : <LoanList items={items} />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(LoanListContainer)
