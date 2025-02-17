'use client'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import useRequest from '@/app/global/hooks/useRequest'
import { toQueryString } from '@/app/global/libs/utils'
import { BulletList } from 'react-content-loader'
import { getTransaction } from '../services/actions'
import BankSearch from '../components/Transaction/BankSearch'
import Pagination from '@/app/global/components/Pagination'
import ListForm from '../components/Transaction/ListForm'

const Loading = () => <BulletList />

type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
}

const ListContainer = () => {
  useMenuCode('bank', 'transaction')
  const [search, setSearch] = useState<SearchType>({})
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const [seq, setSeq] = useState(null)
  const [form, setForm] = useState({})

  const qs = toQueryString(search) // page=2&limit=10

  const { data, error, isLoading } = useRequest(
    `/bank/api/Transaction/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  useEffect(() => {
    if (data) {
      console.log('data', data)
      setItems(data.data.items)
      setPagination(data.data.pagination)
    }
  }, [data])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const transaction = await getTransaction(seq)
        setForm(transaction)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

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
      {!isLoading && <ListForm items={items} />}
      {/* {isLoading ? <Loading /> : <ListForm items={items} />} */}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(ListContainer)
