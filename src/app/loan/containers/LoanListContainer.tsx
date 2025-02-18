'use client'

import React, {
  useState,
  useCallback,
  useEffect,
  useActionState,
  useLayoutEffect,
} from 'react'
import LoanList from '../components/LoanList'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import LoanSearch from '../components/LoanSearch'
import { toQueryString } from '@/app/global/libs/utils'
import useRequest from '@/app/global/hooks/useRequest'
import { BulletList } from 'react-content-loader'
import Pagination from '@/app/global/components/Pagination'
import LayerPopup from '@/app/global/components/LayerPopup'
import useQueryString from '@/app/global/hooks/useQueryString'
import { getLoan, deleteLoan } from '../services/actions'
import LoanModal from '../components/LoanModal'
import { useRouter } from 'next/navigation'
import { ButtonGroup, SmallButton } from '@/app/global/components/Buttons'

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
  const router = useRouter()

  const [form, setForm] = useState({})

  const _qs = useQueryString(['loanName', 'bankName', 'categories'])
  // 실제 Submit할때 반영, search 변경시에만 Rerendering
  const [search, setSearch] = useState<SearchType>(_qs)

  // 임시로 값 담는 곳
  const [_search, _setSearch] = useState<SearchType>(_qs)

  const [items, setItems] = useState([])

  const [pagination, setPagination] = useState()

  const [isOpen, setIsOpen] = useState(false)
  const [isAllRemoveOpen, setIsAllRemoveOpen] = useState(false)

  const [seq, setSeq] = useState(null)

  const qs = toQueryString(search)

  const { data, error, isLoading } = useRequest(
    `/loan/api/list${qs.trim() ? '?' + qs : ''}`,
  )

  const onChange = useCallback((e) => {
    _setSearch((_search) => ({ ..._search, [e.target.name]: e.target.value }))
  }, [])

  const onReset = useCallback(() => {
    _setSearch({})
    setSearch({})
  }, [])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const loan = await getLoan(seq)
        setForm(loan)
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

  const openClick = useCallback((k, v) => {
    console.log('클릭 확인')
    console.log('field : ' + k)
    console.log('value : ' + v)
    if (k !== v) {
      k = !k
      console.log(k)
    }
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

  const onAllRemoveModal = useCallback(() => {
    setIsAllRemoveOpen(true)
  }, [])

  const closeAllRemoveModal = useCallback(() => {
    setIsAllRemoveOpen(false)
  }, [])

  const actionState = useActionState(deleteLoan, undefined)

  const onRemove = useCallback(
    (seq) => {
      deleteLoan(seq)
      closeModal()

      router.refresh()
    },
    [closeModal, router],
  )

  const onAllRemove = useCallback(() => {
    const seqs = items.filter((item) => item.checked).map((item) => item.seq)
    ;(async () => {
      await deleteLoan(seqs)
      setItems((items) => items.filter((item) => !seqs.includes(item.seq)))
    })()
    closeAllRemoveModal()

    router.refresh()
  }, [closeAllRemoveModal, items, router])

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
        <>
          <LoanList
            items={items}
            onModal={onModal}
            onAllRemoveModal={onAllRemoveModal}
            openClick={openClick}
            onToggleCheck={onToggleCheck}
            onAllToggleCheck={onAllToggleCheck}
            actionState={onAllRemove}
          />
        </>
      )}
      {pagination && (
        <Pagination pagination={pagination} onClick={onPageClick} />
      )}
      {/* ✨✨추가한 부분 S */}
      <LayerPopup
        isOpen={isOpen}
        onClose={closeModal}
        title="대출 삭제"
        width={500}
        height={600}
      >
        <LoanModal
          form={form}
          actionState={actionState}
          closeModal={closeModal}
          onRemove={onRemove}
        />
      </LayerPopup>

      <LayerPopup
        isOpen={isAllRemoveOpen}
        onClose={closeAllRemoveModal}
        title="대출 일괄 삭제"
        width={400}
        height={250}
      >
        <>
          {items.filter((item) => item.checked).length}
          <span>
            개의 데이터를 선택하셨습니다.
            <p>정말 삭제하시겠습니까?</p>
          </span>
          <ButtonGroup width={300} className="button-group center">
            <SmallButton
              type="button"
              color="dark"
              onClick={() => onAllRemove()}
            >
              삭제
            </SmallButton>
            <SmallButton
              type="button"
              color="info"
              onClick={closeAllRemoveModal}
            >
              취소
            </SmallButton>
          </ButtonGroup>
        </>
      </LayerPopup>
      {/* ✨✨추가한 부분 E */}
    </>
  )
}

export default React.memo(LoanListContainer)
