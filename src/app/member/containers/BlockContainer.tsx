import React, { useState, useCallback, useEffect } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import MemberSearch from '../components/MemberSearch'
import BlockForm from '../components/BlockForm'
import Pagination from '@/app/global/components/Pagination'

const Loading = () => <BulletList />
type SearchType = {
  sopt?: string
  skey?: string
  page?: number
  limit?: number
}

const BlockContainer = () => {
  useMenuCode('member', 'block')
  const [search, setSearch] = useState<SearchType>({})

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>({})

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(`/member/api/block`)

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  useEffect(() => {
    if (data) {
      setItems(data.data.data)
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
        />
      )}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
    </>
  )
}

export default React.memo(BlockContainer)
