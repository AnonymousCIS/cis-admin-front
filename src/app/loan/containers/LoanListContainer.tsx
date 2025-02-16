'use client'

import React, { useState, useCallback, useEffect, useContext } from 'react'
import LoanList from '../components/LoanList'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import LoanSearch from '../components/LoanSearch'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'
import LoanDeleteContainer from './LoanDeleteContainer'
import LayerPopup from '@/app/global/components/LayerPopup'

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

  /*
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
  */

  /**
   * Set을 이용해 중복 제거 & 값을 토글 형태로 받는 공통 함수
   *
   * 입력하는 값 & 필드명(type)
   */
  const addToggle = useCallback(
    (value, type) => {
      const set = new Set(_search[type])
      if (set.has(value)) {
        set.delete(value)
      } else {
        set.add(value)
      }
      _setSearch({ ...search, [type]: [...set.values()] })
    },
    [_search, search],
  )

  /* ✨✨추가한 부분 S */
  const onClick = useCallback(
    (field, value) => {
      if (['bankName', 'categories'].includes(field)) {
        addToggle(value, field)
        _setSearch((_search) => ({ ..._search, [field]: value }))
      } else {
        _setSearch((_search) => ({ ..._search, [field]: value }))
      }
    },
    [addToggle, _search, search],
  )

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSeq(null)
  }, [])
  /* ✨✨추가한 부분 E */

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
      {/* ✨✨onClick 추가 */}
      {isLoading ? (
        <Loading />
      ) : (
        <LoanList items={items} onRemove={onRemove} onClick={onClick} />
      )}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
      {/* ✨✨추가한 부분 S */}
      <LayerPopup
        isOpen={isOpen}
        onClose={closeModal}
        title="대출 삭제"
        width={750}
        height={600}
      >
        <LoanDeleteContainer seq={seq} closeModal={closeModal} />
      </LayerPopup>
      {/* ✨✨추가한 부분 E */}
    </>
  )
}

export default React.memo(LoanListContainer)
