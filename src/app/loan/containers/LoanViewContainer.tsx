import React, { useLayoutEffect, useState } from 'react'
import LoanView from '../components/LoanView'
import useMenuCode from '@/app/global/hooks/useMenuCode'
import { getLoanInfo } from '../services/actions'
import { notFound } from 'next/navigation'

const LoanViewContainer = ({
  seq,
}: { seq?: number | undefined } | undefined) => {
  useMenuCode('loan', 'view')

  const [form, setForm] = useState([])

  useLayoutEffect(() => {
    ;(async () => {
      try {
        const loan = await getLoanInfo(seq)
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

  return <LoanView form={form} />
}

export default React.memo(LoanViewContainer)
