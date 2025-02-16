'use client'

import React from 'react'
import WriteForm from '../components/WriteForm'

const WriteContainer = ({
  email,
}: { email?: string | undefined } | undefined) => {
  const name = email.replace('%', '@')
  console.log('name', name)
  return <WriteForm />
}

export default React.memo(WriteContainer)
