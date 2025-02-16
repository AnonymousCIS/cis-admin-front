'use client'
'@typescript-eslint/no-unused-expressions'
import useRequest from '@/app/global/hooks/useRequest'
import React, {
  useActionState,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { List } from 'react-content-loader'
import { deleteMessage, getMessage } from '../services/actions'
import DeleteModalForm from '../components/DeleteModalForm'
import { useRouter } from 'next/navigation'
import useMenuCode from '@/app/global/hooks/useMenuCode'

const Loading = () => <List />

type Props = {
  seq: number
  closeModal: any | undefined
}

const DeleteContainer = ({ seq, closeModal }: Props) => {
  useMenuCode('message', 'delete')
  const [data, setData] = useState({})

  const router = useRouter()

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const message = await getMessage(seq)
        setData(message)
        console.log('message', message)
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
      <DeleteModalForm
        data={data}
        actionState={actionState}
        onDelete={onDelete}
        closeModal={closeModal}
      />
    </>
  )
}

export default React.memo(DeleteContainer)
