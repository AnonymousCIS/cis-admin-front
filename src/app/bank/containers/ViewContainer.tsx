'use client'
import React, {
  useActionState,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import ViewForm from '../components/ViewForm'
import { BulletList } from 'react-content-loader'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getBank, removeBank } from '../services/actions'
import { notFound, useRouter } from 'next/navigation'

import useRequest from '@/app/global/hooks/useRequest'
import ModalForm from '../components/ModalForm'
import LayerPopup from '@/app/global/components/LayerPopup'

const Loading = () => <BulletList />

const ViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('bank', 'list')

  const [form, setForm] = useState([])

  const { isLoading } = useRequest(`/bank/api/bank/view/${seq}`)
  const [isOpen, setIsOpen] = useState(false)

  const onRemove = useCallback(() => {
    setIsOpen(true)
  }, [])

  const router = useRouter()

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const bank = await getBank(seq)
        setForm(bank)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  if (!form) {
    notFound()
  }

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])
  const actionState = useActionState(removeBank, undefined)

  const onBankRemove = useCallback(
    (seq) => {
      removeBank(seq)
      closeModal()
      router.refresh()
    },
    [closeModal, router],
  )

  return (
    <>
      {isLoading ? <Loading /> : <ViewForm form={form} onRemove={onRemove} />}

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

export default React.memo(ViewContainer)

// return <ViewForm form={form} />

// export default React.memo(ViewContainer)
