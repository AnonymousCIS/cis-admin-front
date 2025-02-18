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
import BoardDataSearch from '../components/BoardDataSearch'

import { removeBoardData, getBoardData } from '../services/actions'
// import ModalForm from '../components/ModalForm'

import ModalBoardDataForm from '../components/ModalBoardDataForm'

import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'

import LayerPopup from '@/app/global/components/LayerPopup'
import useQueryString from '@/app/global/hooks/useQueryString'

const Loading = () => <BulletList />

type SearchType = {
  skey?: string
  page?: number
  bid?: string
  categories?: string
  domainStatus?: string
  // recommendCount?: number
  // commentCount?: number
  // comment?: object
}

const ListContainer = () => {
  useMenuCode('board', 'list')

  const router = useRouter()

  const _qs = useQueryString(['bid', 'categories', 'status'])
  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>(_qs)

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>(_qs)

  const [items, setItems] = useState([])

  const [form, setForm] = useState({})

  const [pagination, setPagination] = useState()

  const [isOpen, setIsOpen] = useState(false)

  const [seq, setSeq] = useState(null)

  const [sort, setSort] = useState<string>()

  const onSortChange = useCallback((e) => {
    const sort = e.target.value
    setSearch((search) => ({ ...search, sort }))
  }, [])

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/board/api/list${qs.trim() ? '?' + qs : ''}`,
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
        const boardData = await getBoardData(seq)
        setForm(boardData)
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
      if (['status', 'categories', 'bid'].includes(field)) {
        addToggle(value, field)
      } else {
        _setSearch((_search) => ({ ..._search, [field]: value }))
      }
    },
    [addToggle],
  )

  useEffect(() => {
    if (data) {
      // console.log('데이터', data)
      setItems(data.data.items)
      setPagination(data.data.pagination)
    }
  }, [data])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

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

  const actionState = useActionState(removeBoardData, undefined)

  const onRemove = useCallback(
    (seq) => {
      removeBoardData(seq)
      closeModal()

      // 새로고침 임시용 주석삭제 XX
      router.refresh()
    },
    [closeModal, router],
  )

  const onToggleCheck = useCallback((seq) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.seq === seq ? { ...item, checked: !item.checked } : item,
      ),
    )
  }, [])

  const onAllToggleCheck = useCallback(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, checked: !item.checked })),
    )
  }, [])

  return (
    <>
      <BoardDataSearch
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
        onReset={onReset}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ListForm
          items={items}
          onModal={onModal}
          onClick={onClick}
          onToggleCheck={onToggleCheck}
          onAllToggleCheck={onAllToggleCheck}
        />
      )}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
      <LayerPopup
        isOpen={isOpen}
        onClose={closeModal}
        title="게시글 삭제"
        width={750}
        height={600}
      >
        <ModalBoardDataForm
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
