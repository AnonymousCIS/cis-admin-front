'use client'
import React from 'react'
import { BigButton } from '@/app/global/components/Buttons'
import styled from 'styled-components'

const StyledForm = styled.form``

const TrainForm = ({ onProcess }) => {
  return (
    <>
      <StyledForm>
        <BigButton type="button" color="info" onClick={() => onProcess()}>
          학습하기
        </BigButton>
      </StyledForm>
    </>
  )
}

export default React.memo(TrainForm)
