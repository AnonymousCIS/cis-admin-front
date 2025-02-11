'use client'

import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form``

const bankListForm = () => {
  return (
    <>
      <h1>은행목록나와라얍!</h1>
      <StyledForm autoComplete="off"></StyledForm>
    </>
  )
}

export default React.memo(bankListForm)
