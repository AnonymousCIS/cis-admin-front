import React from 'react'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { SmallButton, ButtonGroup } from '@/app/global/components/Buttons'
import { MdWarning } from 'react-icons/md'

const { secondary, danger } = colors

const StyledForm = styled.form<CommonType>`
  table {
    margin-bottom: 30px;
  }

  th {
    width: 150px;
    text-align: center;
    background: ${secondary};
  }

  div {
    text-align: center;
    margin-bottom: 20px;
    color: ${danger};
  }
`

const LoanModal = ({ form, onRemove, actionState, closeModal }) => {
  /*
    Invalid value for prop `disabled` on <button> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior 
  */
  // ✨✨Button disabled 뜨던 이유 = errors 없어서 inPending이 boolean값이 아니었음

  // 원본
  // const [formAction, isPending] = actionState
  const [errors, formAction, isPending] = actionState

  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <TableCols>
          <tbody>
            <tr>
              <th>대출명</th>
              <td>
                <span>{form?.loanName ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>대출 한도</th>
              <td>
                <span>{form?.limit.toLocaleString() ?? ''}원</span>
              </td>
            </tr>
            <tr>
              <th>대출 카테고리</th>
              <td>
                <span>{form?.categoryStr ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>은행명</th>
              <td>
                <span>{form?.bankNameStr ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>상환년도</th>
              <td>
                <span>{form?.repaymentYear ?? ''}년</span>
              </td>
            </tr>
            <tr>
              <th>대출 설명</th>
              <td>
                <span>{form?.loanDescription ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>이자율</th>
              <td>
                <span>{form?.interestRate ?? ''}%</span>
              </td>
            </tr>
            <tr>
              <th>사용 여부</th>
              <td>
                <span>
                  {form?.isOpen !== null && form?.isOpen === true
                    ? '사용'
                    : '미사용'}
                </span>
              </td>
            </tr>
          </tbody>
        </TableCols>
        <div>
          <MdWarning />
          <span>정말 삭제하시겠습니까?</span>
          <p>삭제한 대출은 복구할 수 없습니다.</p>
        </div>

        <ButtonGroup width={300} className="button-group center">
          <SmallButton
            type="submit"
            color="dark"
            disabled={isPending}
            onClick={() => onRemove(form?.seq)}
          >
            삭제
          </SmallButton>
          <SmallButton
            type="button"
            color="info"
            disabled={isPending}
            onClick={closeModal}
          >
            취소
          </SmallButton>
        </ButtonGroup>
      </StyledForm>
    </>
  )
}

export default React.memo(LoanModal)
