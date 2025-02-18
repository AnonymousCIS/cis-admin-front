'use client'
'@typescript-eslint/no-unused-expressions'
import React, { useLayoutEffect, useState, useCallback } from 'react'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { notFound } from 'next/navigation'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'
import UserView from '../components/UserView'

import { deleteLoan, getUserLoan } from '../services/actions'


const Loading = () => <BulletList />

const CardViewContainer = ({ seq }: { seq?: number | undefined } | undefined) => {
  useMenuCode('loan', 'view')

  const [form, setForm] = useState([])

  const onDelete = useCallback(() => {
    deleteLoan(seq)
  }, [seq])

  useLayoutEffect(() => {
    (async () => {
      try {
        const loan = await getUserLoan(seq)
        console.log('loan:', loan) 
        if (!loan) {
          notFound()
        } else {
          setForm(loan)
        }
      } catch (err) {
        console.error('error:', err)
        notFound()
      }
    })()
  }, [seq])

  return (
    <>
      {<UserView form={form} onDelete={onDelete} />}
    </>
  )
}

export default React.memo(CardViewContainer)
