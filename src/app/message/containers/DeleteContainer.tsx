'use client'
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

const Loading = () => <List />

type Props = {
  seq: number
  closeModal?: any | undefined
}

const DeleteContainer = ({ seq, closeModal }: Props) => {
  console.log('seq', seq)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  useLayoutEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const _data = await getMessage(seq)
        setData(_data)
      } catch (err) {
        console.error(err)
        return
      }
      setIsLoading(false)
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
      {isLoading ? (
        <Loading />
      ) : (
        <DeleteModalForm
          data={data}
          actionState={actionState}
          onDelete={onDelete}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default React.memo(DeleteContainer)
