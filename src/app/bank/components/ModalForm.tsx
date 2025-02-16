import React from 'react'
import { TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import colors from '@/app/global/styles/colors'
import { BigButton } from '@/app/global/components/Buttons'
import styled from 'styled-components'

const { primary, white } = colors

const StyledForm = styled.form`
  table {
    margin-bottom: 30px;

    th {
      width: 120px;
      background: ${primary};
      color: ${white};
    }

    td {
      & > * + * {
        margin-left: 20px;
      }
    }

    &:last-of-type {
      margin-bottom: 30px;
    }
  }
  div {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`

const ModalForm = ({ form, actionState, closeModal }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <SubTitle>계좌 상세</SubTitle>
        <TableCols>
          <tbody>
            <tr>
              <th>계좌 ID</th>
              <td>
                <span>{form?.seq ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>은행 기관명</th>
              <td>
                <span>{form?.bankName ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>계좌 잔액</th>
              <td>
                <span>{form?.accountBalance ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>공개 여부</th>
              <td>
                <span>
                  {form?.open !== null && form?.open === true
                    ? '공개'
                    : '미공개'}
                </span>
              </td>
            </tr>
          </tbody>
        </TableCols>
        <div>
          <BigButton
            type="submit"
            color="dark"
            width={100}
            disabled={isPending}
            // onClick={onRemove}
          >
            삭제
          </BigButton>
          <BigButton
            type="button"
            color="info"
            width={100}
            disabled={isPending}
            onClick={closeModal}
          >
            취소
          </BigButton>
        </div>
      </StyledForm>
    </>
  )
}

export default React.memo(ModalForm)
