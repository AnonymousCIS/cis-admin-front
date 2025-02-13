'use client'

import React, { useState, useCallback, useEffect } from 'react'

import ListForm from '../components/ListForm'
import CardSearch from '../components/CardSearch'

import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'

const Loading = () => <BulletList />

type SearchType = {
  skey?: string
  page?: number
  limit?: number
  cardTypes?: string[]
  categories?: string[]
  bankName?: string[]
  cardLimitMin?: number
  cardLimitMax?: number
}

const ListContainer = () => {
  useMenuCode('card', 'list')

  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/card/api/card/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    if (['cardTypes', 'bankName', 'categories'].includes(field)) {
      const set = new Set(_search.cardTypes ?? [])
      console.log(set)
      if (set.has(value)) {
        set.delete(value)
      } else {
        set.add(value)
      }
      _setSearch((_search) => ({ ...search, [field]: [...set.values()] }))
    } else {
      _setSearch((_search) => ({ ..._search, [field]: value }))
    }
  }, [])
  // const onClick = useCallback((field, value) => {
  //   _setSearch((prev) => {
  //     if (['cardTypes', 'bankName', 'categories'].includes(field)) {
  //       const set = new Set(prev[field] ?? [])

  //       // 조건문으로 바꾸기
  //       if (set.has(value)) {
  //         set.delete(value) // value가 있으면 삭제
  //       } else {
  //         set.add(value) // 없으면 추가
  //       }

  //       return { ...prev, [field]: [...set] }
  //     }
  //     return { ...prev, [field]: value }
  //   })
  // }, [])

  useEffect(() => {
    if (data) {
      setItems(data.data.data)
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
      <CardSearch
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
      />
      {isLoading ? <Loading /> : <ListForm items={items} />}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(ListContainer)
