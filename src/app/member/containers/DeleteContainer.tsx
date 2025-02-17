'use client'
import React, { useLayoutEffect, useState, useActionState } from 'react'
import { getMember } from '../services/actions'
import { deleteMember } from '../services/actions'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import DeleteForm from '../components/DeleteForm'

type Props = {
  seq?: any | undefined
  closeModal: any | undefined
}

const Loading = () => <BulletList />

const DeleteContainer = ({ seq, closeModal }: Props | undefined) => {
  const [form, setForm] = useState({})

  const { data, isLoading } = useRequest(`/member/api/info/${seq}`)

  console.log('data', data)

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const member = await getMember(seq)
        setForm(member)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  const actionState = useActionState(deleteMember, undefined)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <DeleteForm
          form={form}
          actionState={actionState}
          closeModal={closeModal}
        />
      )}
    </>
  )
}

export default React.memo(DeleteContainer)
