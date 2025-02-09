'use client'

import React from 'react'
import LoanForm from '../components/LoanForm'
import { useSearchParams } from 'next/navigation'

const LoanContainer = () => {
  const searchParams = useSearchParams()

  return <LoanForm />
}

export default React.memo(LoanContainer)
