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

const ModalForm = ({ form, actionState, closeModal, onRemove }) => {
  console.log('form', form)
  const [errors, formAction, isPending] = actionState
  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <SubTitle>계좌 상세</SubTitle>
        <TableCols>
          <tbody>
            <tr>
              <th>거래 ID</th>
              <td>
                <span>{form?.seq ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>은행 기관명</th>
              <td>
                <span>{form?.bank?.bankName ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>이름</th>
              <td>
                <span>{form?.bank?.name ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>가격</th>
              <td>
                <span>{form?.payAmount ?? ''}</span>
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
            onClick={() => {
              onRemove(form?.seq)
            }}
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
