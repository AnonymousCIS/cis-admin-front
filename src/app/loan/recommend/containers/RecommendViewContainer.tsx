import React, { useLayoutEffect, useState, useCallback } from 'react'
import RecommendView from '../components/RecommendView'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getLoan, deleteLoan } from '../services/actions'
import { notFound } from 'next/navigation'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'

// 추가 ✨✨
const Loading = () => <BulletList />

const LoanViewContainer = ({
  seq,
}: { seq?: number | undefined } | undefined) => {
  useMenuCode('loan', 'userlist')

  const [form, setForm] = useState([])

  // 추가 ✨✨
  const { isLoading } = useRequest(`/loan/Recommend/view/${seq}`)

  const onDelete = useCallback(() => {
    deleteLoan(seq)
  }, [seq])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const loan = await getLoan(seq)
        if (loan) {
          loan.mode = 'edit'
          setForm(loan)
        }
      } catch (err) {
        console.error(err)
        notFound()
      }
    })()
  }, [seq])

  // return <LoanView form={form} />
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <RecommendView form={form} onDelete={onDelete} />
      )}
    </>
  )
}

export default React.memo(LoanViewContainer)
