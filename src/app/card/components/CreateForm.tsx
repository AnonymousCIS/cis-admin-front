import React from 'react'
import styled from 'styled-components'

import { Input } from '@/app/global/components/FormComponents'

import { BigButton } from '@/app/global/components/Buttons'

import Messages from '@/app/global/components/Messages'

const StyledForm = styled.form``

// const CreateForm = ({ form, onClick, onChange, actionState }) => {
const CreateForm = ({ form, onChange, actionState }) => {
  const [errors, formAction, isPending] = actionState

  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <Input
          type="text"
          name="cardName"
          placeholder="카드명"
          color="dark"
          value={form?.cardName ?? ''}
          onChange={onChange}
        />

        <Messages color="danger">{errors?.cardName}</Messages>

        <Input
          type="text"
          name="annualFee"
          placeholder="연회비"
          color="dark"
          value={form?.annualFee ?? ''}
          onChange={onChange}
        />

        <Messages color="danger">{errors?.annualFee}</Messages>

        {/* 카드타입 */}
        <Input
          type="text"
          name="cardType"
          placeholder="카드 종류"
          color="dark"
          value={form?.cardType ?? ''}
          onChange={onChange}
        />
        <span>카드 종류</span>

        {/* <select>
          <option value="PersonalCheck">개인 체크</option>
          <option value="PersonalCredit">개인 신용</option>
          <option value="CorporateCheck">법인 체크</option>
          <option value="CorporateCredit">신용 체크</option>
        </select> */}

        <Messages color="danger">{errors?.cardType}</Messages>

        <Input
          type="text"
          name="limit"
          placeholder="카드 한도"
          color="dark"
          value={form?.limit ?? ''}
          onChange={onChange}
        />

        <Messages color="danger">{errors?.limit}</Messages>

        {/* 은행 종류 */}
        <Input
          type="text"
          name="bankName"
          placeholder="은행 종류"
          color="dark"
          value={form?.bankName ?? ''}
          onChange={onChange}
        />

        <Messages color="danger">{errors?.bankName}</Messages>

        {/* 카테고리 */}

        <Input
          type="text"
          name="category"
          placeholder="카테고리"
          color="dark"
          value={form?.category ?? ''}
          onChange={onChange}
        />

        <Messages color="danger">{errors?.category}</Messages>

        <Input
          type="text"
          name="cardDescription"
          placeholder="카드 설명"
          color="dark"
          value={form?.cardDescription ?? ''}
          onChange={onChange}
        />

        <Messages color="danger">{errors?.cardDescription}</Messages>

        <div className="row"></div>
        <BigButton type="submit" className="submit-btn" disabled={isPending}>
          카드 등록
        </BigButton>
      </StyledForm>
    </>
  )
}

export default React.memo(CreateForm)
