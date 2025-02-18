'use client'
'@typescript-eslint/no-unused-expressions'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getUserCard } from '../services/actions'
import { notFound } from 'next/navigation'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import UserView from '../components/UserView'
import { deleteCard } from '../../recommend/services/actions'

const Loading = () => <BulletList />

const LoanViewContainer = ({
  seq,
}: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'user')

  const [form, setForm] = useState([])

  const { isLoading } = useRequest(`/card/user/view/${seq}`)

  const onDelete = useCallback(() => {
    deleteCard(seq)
  }, [seq])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getUserCard(seq)
        // console.log('card', card)
        if (!card) notFound
        else {
          setForm(card)
        }
      } catch (err) {
        console.error(err)
        notFound()
      }
    })()
  }, [seq])

  return (
    <>
      {isLoading ? <Loading /> : <UserView form={form} onDelete={onDelete} />}
    </>
  )
}

export default React.memo(LoanViewContainer)
