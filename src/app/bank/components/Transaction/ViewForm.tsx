import React from 'react'
import styled from 'styled-components'
import { TableCols } from '@/app/global/components/Tables'
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

const ViewForm = ({ form }) => {
  return (
    <>
      <StyledForm>
        <TableCols>
          <tbody>
            <tr>
              <th>거래내역 ID</th>
              <td>
                <span>{form?.seq ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>이름</th>
              <td>
                <span>{form?.bank?.name ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>이메일</th>
              <td>
                <span>{form?.bank?.createdBy ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>가격</th>
              <td>
                <span>{form?.payAmount ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>거래날짜</th>
              <td>
                <span>{form?.createdAt ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>거래 은행</th>
              <td>
                <span>{form?.bank?.bankName ?? ''}</span>
              </td>
            </tr>
          </tbody>
        </TableCols>
        <div className="center">
          <a href={'/bank/transaction/list'}>
            <MediumButton type="button" color="info" width={120}>
              돌아가기
            </MediumButton>
          </a>
        </div>
      </StyledForm>
    </>
  )
}

export default React.memo(ViewForm)
