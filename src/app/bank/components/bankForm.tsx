import React from 'react'
import styled from 'styled-components'
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'
import { Input } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import Messages from '@/app/global/components/Messages'

const StyledForm = styled.form``

const bankForm = ({ form, onClick, onChange, actionState }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <table>
          <tbody>
            <tr>
              <th>은행 기관명</th>
              <td>
                <Input
                  type="text"
                  name="bankName"
                  placeholder="은행 기관명을 선택하세요."
                  color="dark"
                  value={form?.bankName ?? ''}
                  onChange={onChange}
                />
              </td>
              <Messages color="danger">{errors?.bankName}</Messages>
            </tr>
            <tr>
              <th>계좌 번호</th>
              <td>
                <Input
                  name="accountNumber"
                  type="number"
                  placeholder="계좌번호를 입력하세요."
                  color="dark"
                  value={form?.accountNumber ?? ''}
                  onChange={onChange}
                />
              </td>
              <Messages color="danger">{errors?.accountNumber}</Messages>
            </tr>
            <tr>
              <th>예금주</th>
              <td>
                <Input
                  type="text"
                  name="name"
                  placeholder="예금주를 입력하세요."
                  color="dark"
                  value={form?.name ?? ''}
                  onChange={onChange}
                />
              </td>
              <Messages color="danger">{errors?.name}</Messages>
            </tr>
            <tr>
              <th>계좌 비밀번호</th>
              <td>
                <Input
                  type="text"
                  name="password"
                  placeholder="계좌 비밀번호를 입력하세요."
                  color="dark"
                  value={form?.password ?? ''}
                  onChange={onChange}
                />
              </td>
              <Messages color="danger">{errors?.password}</Messages>
            </tr>

            <tr>
              <th>사용여부</th>
              <td>
                {/* member-gender 처럼 선택하는 형식으로 만들 것. 틀을 위해 임시적으로만 사용한 것  */}
                <div className="radio-buttons">
                  <span onClick={() => onClick('isOpen', true)}>
                    {form?.isOpen === true ? (
                      <MdRadioButtonChecked />
                    ) : (
                      <MdRadioButtonUnchecked />
                    )}
                    사용
                  </span>
                  <span onClick={() => onClick('isOpen', false)}>
                    {form?.gender === false ? (
                      <MdRadioButtonChecked />
                    ) : (
                      <MdRadioButtonUnchecked />
                    )}
                    미사용
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <BigButton type="submit" className="submit-btn" disabled={isPending}>
          확인
        </BigButton>
      </StyledForm>
    </>
  )
}

export default React.memo(bankForm)
