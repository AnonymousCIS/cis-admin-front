import React from 'react'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { SmallButton, ButtonGroup } from '@/app/global/components/Buttons'

const { secondary } = colors

const StyledForm = styled.form<CommonType>`
  table {
    margin-bottom: 30px;
  }

  th {
    width: 150px;
    text-align: center;
    background: ${secondary};
  }
`

const CardModal = ({ form, actionState, closeModal }) => {
  /*
    Invalid value for prop `disabled` on <button> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior 
  */
  // ✨✨Button disabled 뜨던 이유 = errors 없어서 inPending이 boolean값이 아니었음

  // 원본
  // const [formAction, isPending] = actionState
  const [errors, formAction, isPending] = actionState

  return (
    <>
      <StyledForm action={formAction}>
        <TableCols>
          <tbody>
            <tr>
              <th>카드명</th>
              <td>
                <span>{form?.cardName ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>은행명</th>
              <td>
                <span>{form?.bankNameStr ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>카드종류</th>
              <td>
                <span>{form?.cardTypeStr ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>카테고리</th>
              <td>
                <span>{form?.categoryStr ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>연회비</th>
              <td>
                <span>{form?.annualFee ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>한도</th>
              <td>
                <span>{form?.limit ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>공개 여부</th>
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

        <ButtonGroup width={300} className="button-group center">
          <SmallButton type="submit" color="dark" disabled={isPending}>
            삭제
          </SmallButton>
        </ButtonGroup>
      </StyledForm>
    </>
  )
}

export default React.memo(CardModal)
