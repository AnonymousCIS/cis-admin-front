'use client'

import React, {
  useLayoutEffect,
  useState,
  useActionState,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import { getCard } from '../services/actions'
import { removeCard } from '../services/actions'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import ModalForm from '../components/ModalForm'

type Props = {
  seq?: number | undefined
  closeModal: any | undefined
}

const Loading = () => <BulletList />

const DeleteContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})

  const { data, isLoading } = useRequest(`/card/api/card/view/${seq}`)

  const router = useRouter()

  // console.log('data', data)

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

  const actionState = useActionState(removeCard, undefined)

  const onRemove = useCallback((seq) => {
    removeCard(seq)
    closeModal()

    // 새로고침 임시용 주석삭제 XX
    router.reload()
  }, [closeModal, router])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ModalForm
          form={form}
          actionState={actionState}
          closeModal={closeModal}
          onRemove={onRemove}
        />
      )}
    </>
  )
}

export default React.memo(DeleteContainer)
