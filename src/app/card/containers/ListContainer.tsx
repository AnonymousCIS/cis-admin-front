'use client'

import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useActionState,
} from 'react'
import { useRouter } from 'next/navigation'

import ListForm from '../components/ListForm'
import CardSearch from '../components/CardSearch'

import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'

import LayerPopup from '@/app/global/components/LayerPopup'
import useQueryString from '@/app/global/hooks/useQueryString'
import { getCard, removeCard } from '../services/actions'
import ModalForm from '../components/ModalForm'

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

  const router = useRouter()

  const _qs = useQueryString(['cardTypes', 'bankName', 'categories'])
  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>(_qs)

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>(_qs)

  const [items, setItems] = useState([])

  const [form, setForm] = useState({})

  const [pagination, setPagination] = useState()

  const [isOpen, setIsOpen] = useState(false)

  const [seq, setSeq] = useState(null)

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/card/api/card/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  const onReset = useCallback((field, value) => {
    setSearch((_search) => ({ ..._search, [field]: value }))
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getCard(seq)
        setForm(card)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

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
    [_search],
  )

  const onClick = useCallback(
    (field, value) => {
      if (['cardTypes', 'bankName', 'categories'].includes(field)) {
        addToggle(value, field)
        // _setSearch((_search) => ({ ..._search, [field]: value }))
      } else {
        _setSearch((_search) => ({ ..._search, [field]: value }))
      }
    },
    [addToggle],
  )

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

  const onModal = useCallback((seq) => {
    setSeq(seq)
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSeq(null)
  }, [])

  const actionState = useActionState(removeCard, undefined)

  const onRemove = useCallback(
    (seq) => {
      removeCard(seq)
      closeModal()

      // 새로고침 임시용 주석삭제 XX
      router.refresh()
    },
    [closeModal, router],
  )

  return (
    <>
      <CardSearch
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
        onReset={onReset}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ListForm items={items} onModal={onModal} onClick={onClick} />
      )}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
      <LayerPopup
        isOpen={isOpen}
        onClose={closeModal}
        title="카드 삭제"
        width={750}
        height={600}
      >
        <ModalForm
          form={form}
          actionState={actionState}
          closeModal={closeModal}
          onRemove={onRemove}
        />
      </LayerPopup>
    </>
  )
}

export default React.memo(ListContainer)
