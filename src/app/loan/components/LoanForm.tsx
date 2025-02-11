import React from 'react'
import styled from 'styled-components'
import { TableCols } from '@/app/global/components/Tables'
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'
import { Input } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import colors from '@/app/global/styles/colors'
import Messages from '@/app/global/components/Messages'

const { secondary, white, info, dark } = colors

const StyledForm = styled.form`
  table {
    border: 1px solid ${dark};
    width: 100%;

    tr {
      border: 1px solid ${dark};

      th {
        background: ${secondary};
        width: 150px;
        height: 50px;
      }

      td {
        input {
          border: 1px solid ${dark};
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        textarea {
          width: 100%;
          min-height: 200px;
          resize: none;
        }
      }
    }
  }

  button {
    margin-top: 30px;
  }
`

const LoanForm = ({ form, onClick, onChange, actionState }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <table>
          <tbody>
            <tr>
              <th>대출명</th>
              <td>
                <Input
                  type="text"
                  name="loanName"
                  placeholder="대출명을 입력해주세요."
                  value={form?.loanName ?? ''}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.loanName}</Messages>
              </td>
            </tr>
            <tr>
              <th>대출 한도</th>
              <td>
                <Input
                  name="limit"
                  type="number"
                  placeholder="최대 한도를 입력해주세요."
                  value={form?.limit ?? ''}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.limit}</Messages>
              </td>
            </tr>
            <tr>
              <th>대출 카테고리</th>
              <td>
                <Input
                  type="text"
                  name="category"
                  placeholder="카테고리를 골라주세요.(신용대출, 담보대출)"
                  value={form?.category ?? ''}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.category}</Messages>
              </td>
            </tr>
            <tr>
              <th>은행명</th>
              <td>
                <Input
                  type="text"
                  name="bankName"
                  placeholder="은행 이름을 입력해주세요."
                  value={form?.bankName ?? ''}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.bankName}</Messages>
              </td>
            </tr>
            <tr>
              <th>상환년도</th>
              <td>
                <Input
                  type="number"
                  name="repaymentYear"
                  placeholder="상환년도를 남겨주세요."
                  value={form?.repaymentYear ?? ''}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.repaymentYear}</Messages>
              </td>
            </tr>
            <tr>
              <th>대출 설명</th>
              <td>
                <textarea
                  name="loanDescription"
                  placeholder="대출에 대한 설명을 남겨주세요."
                  value={form?.loanDescription ?? ''}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.loanDescription}</Messages>
              </td>
            </tr>
            <tr>
              <th>이자율</th>
              <td>
                <Input
                  type="number"
                  name="interestRate"
                  placeholder="이자율을 입력해주세요.(%)"
                  value={form?.interestRate ?? ''}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.interestRate}</Messages>
              </td>
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
                    {form?.isOpen === false ? (
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
          대출 등록
        </BigButton>
      </StyledForm>
    </>
  )
}

export default React.memo(LoanForm)
