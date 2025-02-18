import React, { useState, useCallback, useEffect, useActionState } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import MemberSearch from '../components/MemberSearch'
import BlockForm from '../components/BlockForm'
import Pagination from '@/app/global/components/Pagination'
import { blockDelete, blockUpdate } from '../services/actions'
import { useRouter } from 'next/navigation'
import LayerPopup from '@/app/global/components/LayerPopup'
import ModalForm from '../components/ModalForm'

const Loading = () => <BulletList />
type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
}

const BlockContainer = () => {
  useMenuCode('member', 'block')
  const router = useRouter()
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState<string>('edit')

  const { data, error, isLoading } = useRequest(`/member/api/block`)

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  useEffect(() => {
    if (data) {
      setItems(data.data.data)
      setPagination(data.data.pagination)
      // console.log('data.data.data', data.data.data)
    }
  }, [data])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setSearch({ ..._search })
    },
    [_search],
  )

  const onPageClick = useCallback((page) => {
    page = page ?? 1
    setSearch((search) => ({ ...search, page }))
  }, [])

  const onClick = useCallback((seq, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.seq === seq ? { ...item, [field]: value } : item,
      ),
    )
  }, [])

  const onToggleCheck = useCallback((seq) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.seq === seq ? { ...item, checked: !item.checked } : item,
      ),
    )
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const onProcess = useCallback(
    (mode) => {
      ;(async () => {
        if (mode === 'edit') {
          const res = await blockUpdate(items)
        } else if (mode === 'delete') {
          // 삭제
          const res = await blockDelete(items)
        }
      })()
      closeModal()
      router.refresh()
    },
    [closeModal, items, router],
  )

  const openModal = useCallback((title) => {
    setTitle(title)
    setIsOpen(true)
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

  // console.log('item', items)

  return (
    <>
      <MemberSearch form={_search} onChange={onChange} onSubmit={onSubmit} />
      {isLoading ? (
        <Loading />
      ) : (
        <BlockForm
          form={items}
          onClick={onClick}
          onToggleCheck={onToggleCheck}
          onProcess={openModal}
          onAllToggleCheck={onAllToggleCheck}
        />
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
          closeModal={closeModal}
          onProcess={onProcess}
          title={title}
        />
      </LayerPopup>
    </>
  )
}

export default React.memo(BlockContainer)
