'use client'

import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form``

const bankListForm = () => {
  return (
    <>
      <StyledForm autoComplete="off"></StyledForm>
    </>
  )
}

export default React.memo(bankListForm)
