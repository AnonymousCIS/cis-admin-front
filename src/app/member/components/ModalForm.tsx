import React from 'react'
import { TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import colors from '@/app/global/styles/colors'
import { BigButton } from '@/app/global/components/Buttons'
import styled from 'styled-components'

const { primary, white } = colors

const StyledForm = styled.form`
  div {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`

const ModalForm = ({ closeModal, title, onProcess }) => {
  return (
    <>
      <StyledForm autoComplete="off">
        <SubTitle>
          정말 {title === 'edit' ? '수정' : '삭제'}하시겠습니까?
        </SubTitle>
        <div>
          <BigButton
            type="button"
            color="dark"
            width={100}
            onClick={() => {
              onProcess(title)
            }}
          >
            예
          </BigButton>
          <BigButton
            type="button"
            color="info"
            width={100}
            onClick={closeModal}
          >
            아니오
          </BigButton>
        </div>
      </StyledForm>
    </>
  )
}

export default React.memo(ModalForm)
