'use client'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useActionState,
} from 'react'
import useRequest from '@/app/global/hooks/useRequest'
import { toQueryString } from '@/app/global/libs/utils'
import { BulletList } from 'react-content-loader'
import { getTransactionList } from '../services/actions'
import BankSearch from '../components/Transaction/BankSearch'
import Pagination from '@/app/global/components/Pagination'
import ListForm from '../components/Transaction/ListForm'
import LayerPopup from '@/app/global/components/LayerPopup'
import ModalForm from '../components/Transaction/ModalForm'
import { useRouter } from 'next/navigation'
import { removeTransaction } from '../services/actions'

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
  const router = useRouter()

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const [seq, setSeq] = useState(null)
  const [form, setForm] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  const qs = toQueryString(search) // page=2&limit=10

  const { data, error, isLoading } = useRequest(
    `/bank/api/Transaction/list${qs.trim() ? '?' + qs : ''}`,
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

  const onRemove = useCallback((seq) => {
    setSeq(seq)
    setIsOpen(true)
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const transaction = await getTransactionList(seq)
        setForm(transaction)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      // Submit 했을때 Search 값을 새로운 객체로 깊은 복사해 교체하면서 Rerendering
      setSearch({ ..._search })
    },
    [_search],
  )
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

  const onPageClick = useCallback((page) => {
    page = page ?? 1
    setSearch((search) => ({ ...search, page }))
  }, []) // 클릭한 페이지번호를 서치로..

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSeq(null)
  }, [])

  const onBankRemove = useCallback(
    (seq) => {
      removeTransaction(seq)
      closeModal()
      router.refresh()
    },
    [closeModal, router],
  )
  const actionState = useActionState(removeTransaction, undefined)

  return (
    <>
      <BankSearch
        form={_search}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
      />
      {!isLoading && <ListForm items={items} onRemove={onRemove} />}
      {/* {isLoading ? <Loading /> : <ListForm items={items} />} */}
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
          onRemove={onBankRemove}
        />
      </LayerPopup>
    </>
  )
}

export default React.memo(ListContainer)
