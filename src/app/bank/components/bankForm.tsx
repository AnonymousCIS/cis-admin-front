import React, { useState } from 'react'
import styled from 'styled-components'
import { Input } from '@/app/global/components/FormComponents'
import Select from 'react-select'
import { bankOptions } from './bankSelect'
import Messages from '@/app/global/components/Messages'
import { BigButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form``

const BankForm = ({ actionState }) => {
  const [form, setForm] = useState({
    bankName: null,
    accountNumber: '',
    name: '',
  })

  const [errors, formAction, isPending] = actionState

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSelectChange = (selectedOption) => {
    setForm((prevForm) => ({ ...prevForm, bankName: selectedOption }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('제출 데이터:', form)

    formAction(form)
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      {/* 은행 종류 */}
      <div style={{ marginBottom: '20px' }}>
        <label>은행 기관명</label>
        <Select
          options={bankOptions}
          value={form.bankName}
          onChange={handleSelectChange}
          placeholder="은행 종류를 선택하세요"
          isClearable
        />
        <Messages color="danger">{errors?.bankName}</Messages>
      </div>

      {/* 계좌 번호 */}
      <Input
        type="text"
        name="accountNumber"
        placeholder="계좌 번호"
        color="dark"
        value={form.accountNumber}
        onChange={handleChange}
      />
      <Messages color="danger">{errors?.accountNumber}</Messages>

      {/* 예금주 이름 */}
      <Input
        type="text"
        name="name"
        placeholder="예금주"
        color="dark"
        value={form.name}
        onChange={handleChange}
      />
      <Messages color="danger">{errors?.name}</Messages>
      <br />
      {/* 저장 버튼 */}
      <br />
      <BigButton type="submit" className="submit-btn" disabled={isPending}>
        저장
      </BigButton>
    </StyledForm>
  )
}

export default React.memo(BankForm)
