import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { MediumButton } from '@/app/global/components/Buttons'
import { CommonType } from '@/app/global/types/StyledType'
import colors from '@/app/global/styles/colors'

const { primary, white } = colors

const StyledForm = styled.form<CommonType>`
  table {
    margin-bottom: 30px;

    th {
      width: 180px;
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

  & > .center {
    display: flex;
    justify-content: center;
    gap: 5px;

    & > * {
      display: block;
    }
  }
`

const ViewForm = ({ form, onRemove }) => {
  return (
    <>
      <StyledForm>
        <input type="hidden" name="bankName" value={form?.bankName} />
        <TableRows>
          <tbody>
            <tr>
              <th>은행 기관명</th>
              <td>
                <span>{form?.bankNameStr ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>계좌 번호</th>
              <td>
                <span>{form?.accountNumber ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>예금주</th>
              <td>
                <span>{form?.name ?? ''}</span>
              </td>
            </tr>
          </tbody>
        </TableRows>

        <div className="center">
          <a href={'/bank/list'}>
            <MediumButton
              type="button"
              color="secondary"
              width={120}
              //    onClick={onclick}
            >
              돌아가기
            </MediumButton>
          </a>
          <MediumButton
            type="button"
            color="dark"
            width={120}
            onClick={onRemove}
          >
            삭제
          </MediumButton>
        </div>
      </StyledForm>
    </>
  )
}

export default React.memo(ViewForm)
