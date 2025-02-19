'use client'
import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useActionState,
} from 'react'
import { getMember } from '../services/actions'
import EditForm from '../components/EditForm'
import { updateMember } from '../services/actions'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import { notFound } from 'next/navigation'
import useAddress from '@/app/global/hooks/useAddress'

const Loading = () => <BulletList />

const EditContainer = ({ seq }: { seq?: any | undefined } | undefined) => {
  const [form, setForm] = useState({})

  const { data, error, isLoading } = useRequest(`/member/api/info/${seq}`)

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

  const actionState = useActionState(updateMember, undefined)

  const onChange = useCallback((e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }))
  }, [])

  const onClick = useCallback((field, value) => {
    setForm((form) => ({ ...form, [field]: value }))
  }, [])

  const onReset = useCallback(() => {
    ;(async () => {
      try {
        const member = await getMember(seq)
        if (!member) {
          setForm(member)
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [seq])

  // console.log('form', form)

  if (!form) {
    notFound()
  }

  const onSelectAddress = useAddress((data) => {
    setForm((form) => ({ ...form, ...data }))
  })

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <EditForm
          form={form}
          onChange={onChange}
          onClick={onClick}
          actionState={actionState}
          onReset={onReset}
          onSelectAddress={onSelectAddress}
        />
      )}
    </>
  )
}

export default React.memo(EditContainer)
