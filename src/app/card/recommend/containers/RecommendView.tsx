import React, { useLayoutEffect, useState, useCallback } from 'react'
import RecommendView from '../components/RecommendView'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getCard, deleteCard } from '../services/actions'
import { notFound } from 'next/navigation'
import { BulletList } from 'react-content-loader'
import useRequest from '@/app/global/hooks/useRequest'

// 추가 ✨✨
const Loading = () => <BulletList />

const LoanViewContainer = ({
  seq,
}: { seq?: number | undefined } | undefined) => {
  useMenuCode('card', 'userlist')

  const [form, setForm] = useState([])

  // 추가 ✨✨
  const { isLoading } = useRequest(`/card/recommend/view/${seq}`)

  const onDelete = useCallback(() => {
    deleteCard(seq)
  }, [seq])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const card = await getCard(seq)
        if (card) {
          card.mode = 'edit'
          setForm(card)
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
