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
import { notFound } from 'next/navigation'

const EditContainer = ({ seq }: { seq?: any | undefined } | undefined) => {
  const [form, setForm] = useState({})

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const member = await getMember(seq)
        if (member) {
          setForm(member)
          console.log('member', member)
        } else {
          console.log('test', seq)
          notFound()
        }
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
        if (member) {
          setForm(member)
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])
  return (
    <>
      {/* {memberFound ? (

      ) : (
        notFound()
      )} */}
      <EditForm
        form={form}
        onChange={onChange}
        onClick={onClick}
        actionState={actionState}
        onReset={onReset}
      />
    </>
  )
}

export default React.memo(EditContainer)
