// import React, { useState } from 'react'
import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/global/components/FormComponents'
import Select from 'react-select'
import { bankOptions } from './bankSelect'
import Messages from '@/app/global/components/Messages'
import { BigButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form``

const BankForm = ({ actionState, form, handleSelectChange, handleChange }) => {
  /*
  const [form, setForm] = useState({
    bankName: null,
    accountNumber: '',
    name: '',
  })
  */
  const [errors, formAction, isPending] = actionState
  // 폼액션 : 폼 데이터를 서버로 전송하는 함수
  // 팬딩 : 서버 작업여부 확인 / true, false
  /*
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  } // name, value를 사용해서 동적으로 특정 필드 업뎃 -> 여러 입력필드를 하나의 폼상태로 관리하기 위해서 이방식 사용한거
  // ...prevForm : 기존 상태 복사하여 유지시켜줌

  const handleSelectChange = (selectedOption) => {
    setForm((prevForm) => ({ ...prevForm, bankName: selectedOption }))
  } // 드롭다운에서 선택된 값을 form.bankName에 저장

  const handleSubmit = (e) => {
    e.preventDefault() // 페이지 새로고침 방지
    console.log('Option selected:', form)

    formAction(form) // 서버로 데이터를 전송!
  }
  */
  return (
    <StyledForm action={formAction}>
      {/* 은행 종류 */}
      <div style={{ marginBottom: '20px' }}>
        <label>은행 기관명</label>
        <Select
          options={bankOptions} // 드롭다운 항목
          value={form.bankName} // 선택된 값
          onChange={handleSelectChange}
          placeholder="은행 종류를 선택하세요"
          isClearable // 선택 초기화 가능 여부
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
