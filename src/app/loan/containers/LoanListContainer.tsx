'use client'

import React, { useState, useCallback, useEffect } from 'react'
import LoanList from '../components/LoanList'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import LoanSearch from '../components/LoanSearch'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'
import LoanDeleteContainer from './LoanDeleteContainer'
import LayerPopup from '@/app/global/components/LayerPopup'
import useQueryString from '@/app/global/hooks/useQueryString'

const Loading = () => <BulletList />

type SearchType = {
  skey?: string
  page?: number
  limit?: number
  loanName?: string
  categories?: string[]
  bankName?: string[]
  loanLimitMax?: number
  loanLimitMin?: number
}

const LoanListContainer = () => {
  useMenuCode('loan', 'list')

  const _qs = useQueryString(['loanName', 'bankName', 'categories'])
  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>(_qs)

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>(_qs)

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const [isOpen, setIsOpen] = useState(false)
  const [seq, setSeq] = useState(null)

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/loan/api/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  const onReset = useCallback((field, value) => {
    setSearch((_search) => ({ ..._search, [field]: value }))
  }, [])

  /**
   * Set을 이용해 중복 제거 & 값을 토글 형태로 받는 공통 함수
   *
   * 입력하는 값 & 필드명(type)
   */
  const addToggle = useCallback(
    (value, type) => {
      const set = new Set(_search[type] ?? [])
      if (set.has(value)) {
        set.delete(value)
      } else {
        set.add(value)
      }
      _setSearch({ ..._search, [type]: [...set.values()] })
    },
    [_search, search],
  )

  /* ✨✨추가한 부분 S */
  const onClick = useCallback(
    (field, value) => {
      if (['loanName', 'bankName', 'categories'].includes(field)) {
        addToggle(value, field)
        // _setSearch((_search) => ({ ..._search, [field]: value }))
      } else {
        _setSearch((_search) => ({ ..._search, [field]: value }))
      }
    },
    [addToggle],

  )

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSeq(null)
  }, [])
  /* ✨✨추가한 부분 E */

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
        onReset={onReset}
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
