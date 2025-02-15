'use client'

import React, { useState, useCallback, useEffect, useContext } from 'react'
import LoanList from '../components/LoanList'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import LoanSearch from '../components/LoanSearch'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'
import { log } from 'console'

const Loading = () => <BulletList />

type SearchType = {
  skey?: string
  page?: number
  limit?: number
  loanName?: string
  categories?: string[]
  bankName?: string[]
  check?: Map<string, Set<string>>
}

const LoanListContainer = () => {
  useMenuCode('loan', 'list')

  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const [seq, setSeq] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/loan/api/list${qs.trim() ? '?' + qs : ''}`,
  )

  const map = new Map<string, Set<string>>()
  const onClick = useCallback((k: string, v: string) => {
    if (!map.has(k)) {
      console.log(k + '라는 key가 존재하지 않아 생성')
      map.set(k, new Set<string>())
    }
    map.get(k)?.add(v)

    if (map.get(k).has(v)) {
      map.get(k).delete(v)
    } else {
      map.get(k).add(v)
    }

    console.log('map - keys : ' + map.keys().toArray())

    console.log('map - ' + k + '의 values : ' + map.get(k).size)
    _setSearch((_search) => ({ ..._search, [k]: [...map.values()] }))
  }, [])

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

  const onRemove = useCallback((seq) => {
    setSeq(seq)
    setIsOpen(true)
  }, [])

  return (
    <>
      <LoanSearch
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
      />
      {isLoading ? <Loading /> : <LoanList items={items} onRemove={onRemove} />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(LoanListContainer)
