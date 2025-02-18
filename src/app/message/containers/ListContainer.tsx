'use client'
import React, {
  useCallback,
  useState,
  useEffect,
  useActionState,
  useLayoutEffect,
} from 'react'
import ListForm from '../components/ListForm'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { List } from 'react-content-loader'
import Search from '../components/Search'
import Pagination from '@/app/global/components/Pagination'
import LayerPopup from '@/app/global/components/LayerPopup'
import useQueryString from '@/app/global/hooks/useQueryString'
import DeleteModalForm from '../components/DeleteModalForm'
import { deleteMessage, getMessage } from '../services/actions'
import { useRouter } from 'next/navigation'

const Loading = () => <List />

type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
  status?: 'UNREAD' | 'READ'
  mode?: 'receive' | 'send'
}

const ListContainer = () => {
  useMenuCode('message', 'listForm')

  const _qs = useQueryString(['skey', 'status'])

  const [search, setSearch] = useState<SearchType>({})

  // 임시값
  const [_search, _setSearch] = useState<SearchType>(_qs)

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const [isOpen, setIsOpen] = useState(false)
  const [seq, setSeq] = useState(null)

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/message/api/list${qs.trim() ? '?' + qs : ''}`,
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
      setSearch({ ..._search })
    },
    [_search],
  )

  const onModal = useCallback((seq) => {
    setIsOpen(true)
    setSeq(seq)
  }, [])

  const onToggleCheck = useCallback((seq) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.seq === seq ? { ...item, checked: !item.checked } : item,
      ),
    )
  }, [])

  const onAllToggleCheck = useCallback(() => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        AllCehcked: !item.AllCehcked,
        checked: !item.AllCehcked,
      })),
    )
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setSeq(null)
  }, [])

  const onPageClick = useCallback((page) => {
    page = page ?? 1
    setSearch((search) => ({ ...search, page }))
  }, [])

  const [form, setForm] = useState([])

  const router = useRouter()

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const _form = await getMessage(seq)
        setForm(_form)
      } catch (err) {
        console.error(err)
        return
      }
    })()
  }, [seq])

  const actionState = useActionState(deleteMessage, undefined)

  const onDelete = useCallback(
    (seq) => {
      deleteMessage(seq)
      closeModal()

      router.refresh()
    },
    [closeModal, router],
  )

  return (
    <>
      <Search form={_search} onChange={onChange} onSubmit={onSubmit} />
      {isLoading ? (
        <Loading />
      ) : (
        <ListForm
          items={items}
          onModal={onModal}
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
        title="쪽지 삭제"
        width={750}
        height={600}
      >
        <DeleteModalForm
          form={form}
          actionState={actionState}
          onDelete={onDelete}
          closeModal={closeModal}
        />
      </LayerPopup>
    </>
  )
}

export default React.memo(ListContainer)
