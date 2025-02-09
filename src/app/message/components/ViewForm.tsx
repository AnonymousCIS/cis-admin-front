import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form``

const ViewForm = () => {
  return (
    <>
      <StyledForm>
        <dl>
          <dt>제목</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>보낸 사람 이메일</dt>
          <dd></dd>
        </dl>
        <dl>
          <dt>내용</dt>
          <dd></dd>
        </dl>
      </StyledForm>
    </>
  )
}

export default React.memo(ViewForm)
